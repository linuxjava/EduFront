<template>
    <div class="pb-6">
        <LoadingGroup :pending="pending" :error="error">
            <section class="bg-white rounded px-3 py-2 flex">
                <n-image :src="data.cover" class="w-[340px] h-[200px]" />
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
                        <n-tag :type="primary" class="bg-yellow-100 text-yellow-500" size="tiny">领取优惠卷</n-tag>
                    </div>

                    <div class="!mt-auto" v-if="!data.isbuy">
                        <n-button type="primary" :loading="loading" @click="onStudy">立即学习</n-button>
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
                        <div v-html="data.isbuy ? data.content : data.try" class="mx-4 pb-4 pt-2"></div>
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
import { NImage, NTag, NButton, NGrid, NGridItem } from 'naive-ui'
const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}
const tabs = [{
    label: "详情",
    value: "detail"
}, {
    label: "目录",
    value: "dir"
}]

const curTab = ref('detail')

const route = useRoute()
const { type, id } = route.params
const loading = ref(false)

const { data,
    error,
    pending,
    refresh } = await useCourseDetailApi({ id })

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
}

function onStudy(){
    useHasAuth(async () => {
        loading.value = true
        const{error} = await useLearnApi({
            goods_id: data.value.id,
            type
        })
        loading.value = false
        if(error.value)return
        refresh()
    })
}
</script>
<style></style>