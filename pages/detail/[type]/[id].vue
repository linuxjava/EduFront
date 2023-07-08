<template>
    <div>
        <LoadingGroup :pending="pending" :error="error">
            <section class="bg-white rounded px-3 py-2 flex">
                <n-image :src="data.cover" class="w-[340px] h-[200px]" />
                <div class="ml-4 flex flex-col py-1">
                    <div class="flex items-center">
                        <span class="text-base">{{ data.title }}</span>
                        <FavaBtn :isFava="data.isfava" :type="type" :goods_id="data.id" class="ml-2"></FavaBtn>
                    </div>
                    <span class="text-gray-300 mt-1">[{{ o[data.type] }}] {{ data.sub_count }}人学过</span>
                    <div class="mt-1" v-if="!data.isbuy">
                        <Price :value="data.price"></Price>
                        <Price through class="!text-xs ml-1"></Price>
                    </div>
                    <div class="mt-1" v-if="!data.isbuy">
                        <n-tag :type="primary" class="bg-yellow-100 text-yellow-500" size="tiny">领取优惠卷</n-tag>
                    </div>

                    <div class="!mt-auto" v-if="!data.isbuy">
                        <n-button type="primary" :loading="loading" @click="">立即学习</n-button>
                    </div>
                </div>
            </section>

            <div class="mt-4">
                <n-grid :x-gap="20">
                    <n-grid-item :span="18" class="bg-white rounded">
                        <UiTab class="border-b">
                            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="item.value === type"
                                @click="tabItemClick(item)">
                                {{ item.label }}</UiTabItem>
                        </UiTab>
                        <div v-html="data.isbuy ? data.content : data.try" class="mx-4 pb-4 pt-2"></div>
                    </n-grid-item>

                    <n-grid-item :span="6" class="bg-white rounded">
                        <div class="border-b h-[45px] flex items-center pl-2">
                            精品推荐
                        </div>
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
    value: "course"
}, {
    label: "专栏",
    value: "column"
}]

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
</script>
<style></style>