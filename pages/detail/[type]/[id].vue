<template>
    <div class="pb-6">
        <LoadingGroup :pending="pending" :error="error">
            <section class="bg-white rounded px-3 py-2 flex">
                <n-image :src="data.cover" class="image" :class="{'book-image': type === 'book'}" />
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
                    <div class="mt-1" v-if="!data.isbuy">
                        <CouponPopover></CouponPopover>
                    </div>

                    <div class="!mt-auto" v-if="!data.isbuy">
                        <template v-if="type === 'book'">
                            <n-button v-if="freeChapterId" class="ml-2" type="primary" strong secondary 
                            @click="learn({id: freeChapterId})">免费试看</n-button>
                            <n-button v-else type="primary" disabled>敬请期待</n-button>
                        </template>
                        <n-button v-else type="primary" :loading="loading" @click="onStudy">立即学习</n-button>
                    </div>
                </div>
            </section>

            <div class="mt-4">
                <n-grid :x-gap="20">
                    <n-grid-item :span="18" class="bg-white rounded">
                        <UiTab class="border-b">
                            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="curTab === item.value"
                                @click="tabItemClick(item)">
                                {{ item.label }}</UiTabItem>
                        </UiTab>
                        <!-- 这里只有type == mdeia的才进行isbuy判断显示content还是try -->
                        <div v-if="curTab === 'detail'" v-html="(data.type == 'media' && data.isbuy) ? data.content : data.try" class="mx-4 pb-4 pt-2"></div>
                        <div v-else>
                            <DetailMenu v-if="menu && menu.length > 0">
                                <DetailMenuItem v-for="(item, index) in menu" :key="index" :item="item" :index="index" @click="learn(item)"></DetailMenuItem>
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
import CouponPopover from '~/components/CouponPopover.vue';
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
if(route.query.tab === 'menu'){
    curTab.value = 'menu'
}

const { type, id } = route.params
const loading = ref(false)

if(type === 'column' || type === 'book') {
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
    if(type === 'course') {
        return `【${o[data.value.type]}】${data.value.sub_count}人学过`
    }else{
        return `${data.value.sub_count}人学过`
    }
})

function tabItemClick(item) {
    curTab.value = item.value
    navigateTo({
        query: {
            tab: item.value
        }
    })
}

function onStudy(){
    useHasAuth(async () => {
        if(data.price === 0) {//免费
            loading.value = true
            const{error} = await useLearnApi({
                goods_id: data.value.id,
                type
            })
            loading.value = false
            if(error.value)return
            refresh()
        }
    })
}

//获取电子书第一个免费是否章节id，如果有说明该电子说支持免费试看
const freeChapterId = computed(() => { 
    let id = 0;
    if(type === 'book' && data.value && data.value.book_details) {
        const item = data.value.book_details.find( item => item.isfree === 1)
        if(item) {
            id = item.id
        }
    }
    return id
})

const menu = computed(() => {
    return type === 'book' ? data.value.book_details : data.value.column_courses
})

// 点击目录菜单
const learn = (item)=>{
        useHasAuth(()=>{
            // 专栏
            if(type == "column" && item.price != 0 && !data.value.isbuy){
                return useMessage().error("请先购买该专栏")
            }
            // 跳转
            let url = ""
            if(type == "column"){
                url = `/detail/course/${item.id}?column_id=${data.value.id}`
            } else if(type == 'book'){
                url = `/book/${data.value.id}/${item.id}`
            }
            navigateTo(url)
        })
    }
</script>
<style>
.image{
    @apply rounded w-[340px] h-[200px]
}
.book-image{
    @apply rounded w-[130px] h-[180px]
}
</style>