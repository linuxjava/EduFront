<template>
    <div class="pb-6">
        <LoadingGroup :pending="pending" :error="error">
            <div class="bg-white rounded px-3 py-2">
                <!-- 音频和视频有专门的顶部样式 -->
                <div v-if="data.type === 'audio' || data.type === 'video' || data.type === 'live'">
                    <ClientOnly>
                        <!-- 这个是ClientOnly服务端渲染时的loading插槽 -->
                        <template #fallback>
                            <LoadingSkeleton />
                        </template>
                        <PlayerAudio v-if="data.type === 'audio'" :name="data.title" :url="data.content" :artist="音频" />
                        <PlayerVideo v-else-if="data.type === 'video'" :url="data.content" />
                        <PlayerLive v-else-if="type === 'live'" :url="data.playUrl" />
                    </ClientOnly>
                </div>

                <div v-else class="flex">
                    <n-image :src="data.cover" class="image" :class="{ 'book-image': type === 'book' }" />
                    <div class="ml-4 flex flex-col py-1">
                        <div class="flex items-center">
                            <span class="text-base">{{ data.title }}</span>
                            <FavaBtn :isFava="data.isfava" :type="type" :goods_id="data.id" class="ml-2"></FavaBtn>
                        </div>
                        <span class="text-gray-300 mt-1">{{ r }}</span>
                        <div class="mt-1" v-if="!data.isbuy">
                            <Price :value="data.price"></Price>
                            <Price through :value="data.t_price" class="!text-xs ml-1"></Price>
                        </div>
                        
                        <div>
                            <LiveStatusBar v-if="type === 'live'" :start="data.start_time" :end="data.end_time"></LiveStatusBar>
                            <CouponPopover v-else-if="!data.isbuy" class="mt-1"></CouponPopover>
                        </div>

                        <div class="!mt-auto" v-if="!data.isbuy">
                            <template v-if="type === 'book'">
                                <template v-if="menu.length > 0">
                                    <n-button type="primary" :loading="loading" @click="buy">立即学习</n-button>
                                    <n-button v-if="freeChapterId" class="ml-2" type="primary" strong secondary
                                        @click="learn({ id: freeChapterId })">免费试看</n-button>
                                </template>
                                <n-button v-else type="primary" disabled>敬请期待</n-button>
                            </template>
                            <n-button v-else type="primary" :loading="loading" @click="buy">立即学习</n-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <n-grid :x-gap="20">
                    <n-grid-item :span="18" class="bg-white rounded">
                        <UiTab class="border-b">
                            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="curTab === item.value"
                                @click="tabItemClick(item)">
                                {{ item.label }}</UiTabItem>
                        </UiTab>
                        <!-- 这里只有type == mdeia的才进行isbuy判断显示content还是try -->
                        <div v-if="curTab === 'detail'"
                            v-html="(data.type == 'media' && data.isbuy) ? data.content : data.try" class="mx-4 pb-4 pt-2">
                        </div>
                        <div v-else>
                            <DetailMenu v-if="menu && menu.length > 0">
                                <DetailMenuItem v-for="(item, index) in menu" :key="index" :item="item" :index="index"
                                    @click="learn(item)"></DetailMenuItem>
                            </DetailMenu>
                            <Empty v-else></Empty>
                        </div>
                    </n-grid-item>

                    <n-grid-item :span="6" class="bg-white rounded pb-6">
                        <div class="border-b h-[45px] flex items-center pl-3">
                            精品推荐
                        </div>
                        <HotList></HotList>
                    </n-grid-item>
                </n-grid>
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NImage, NTag, NButton, NGrid, NGridItem, NEmpty } from 'naive-ui'

const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}
const tabs = ref([{
    label: "详情",
    value: "detail"
}])
const route = useRoute()

let curTab = ref('detail')
if (route.query.tab === 'menu') {
    curTab.value = 'menu'
}

const { type, id } = route.params
const loading = ref(false)
useInitHead()

if (type === 'column' || type === 'book') {
    tabs.value.push({
        label: "目录",
        value: "menu"
    })
}

const { data,
    error,
    pending,
    refresh } = await useCommonDetailApi(type, { id })

//因为该页面的title需要设置为课程名称，所以需要使用计算属性设置
const title = computed(() => pending.value ? '课程详情' : data.value?.title)
useHead({ title })

//课程和专栏显示有区别，如果是course需要具体显示图文、音频、视频等
const r = computed(() => {
    if (type === 'course') {
        return `【${o[data.value.type]}】${data.value.sub_count}人学过`
    } else {
        return `${data.value.sub_count}人学过`
    }
})

function tabItemClick(item) {
    curTab.value = item.value
    navigateTo({
        query: {
            tab: item.value
        }
    }, {replace: true})
}

function buy() {
    useHasAuth(async () => {
        if (data.price === 0) {//免费
            loading.value = true
            const { error } = await useLearnApi({
                goods_id: data.value.id,
                type
            })
            loading.value = false
            if (error.value) return
            refresh()
            return
        }

        let ty = 'course'
        if(type === 'book'){
            type = 'book'
        }else if(type === 'live'){
            type = 'live'
        }else if(type === 'column'){
            type = 'column'
        }else if(type === 'flashsale'){
            type = 'flashsale'
        }else if(type === 'group'){
            type = 'group'
        }
        navigateTo(`/createorder??type=${ty}&id=${data.value.id}`)
    })
}

//获取电子书第一个免费是否章节id，如果有说明该电子说支持免费试看
const freeChapterId = computed(() => {
    let id = 0;
    if (type === 'book' && data.value && data.value.book_details) {
        const item = data.value.book_details.find(item => item.isfree === 1)
        if (item) {
            id = item.id
        }
    }
    return id
})

const menu = computed(() => {
    return type === 'book' ? data.value.book_details : data.value.column_courses
})

// 点击目录菜单
const learn = (item) => {
    useHasAuth(() => {
        // 跳转
        let url = ""
        if (type == "column") {
            if (item.price != 0 && !data.value.isbuy) {
                return useMessage().error("请先购买该专栏")
            }
            url = `/detail/course/${item.id}?column_id=${data.value.id}`
        } else if (type == 'book') {
            if (item.isfree != 1 && !data.value.isbuy) {
                return useMessage().error("请先购买该电子书")
            }
            url = `/book/${data.value.id}/${item.id}`
        }
        navigateTo(url)
    })
}

// 初始化head,注意：加载css和js需要放到function中调用执行，直接将useHead放到外面执行会有问题
function useInitHead() {
    if (type === "course") {
        useHead({
            link: [{
                rel: "stylesheet",
                href: "/aplayer/APlayer.min.css"
            }],
            script: [{
                src: "/aplayer/APlayer.min.js",
            }, {
                src: "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js"
            }]
        })
    }
    if(type === "live"){
        useHead({
            script:[{
                src:"//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js",
            },{
                src:"//unpkg.byted-static.com/xgplayer-flv/2.5.1/dist/index.min.js"
            }]
        })
    }
}
</script>
<style>
.image {
    @apply rounded w-[340px] h-[200px]
}

.book-image {
    @apply rounded w-[130px] h-[180px]
}
</style>