<template>
    <div>
        <LoadingGroup :pending="pending" :error="error">
            <section class="bg-white rounded px-3 py-2 flex">
                <n-image :src="data.cover" class="w-[340px] h-[200px]" />
                <div class="ml-4 flex flex-col py-1">
                    <div class="flex items-center">
                        <span class="text-base">{{ data.title }}</span>
                        <n-tag :type="data.isfava ? 'primary' : 'default'" size="tiny" class="ml-2">收藏</n-tag>
                    </div>
                    <span class="text-gray-300 mt-1">[{{ o[data.type] }}] {{ data.sub_count }}人学过</span>
                    <div class="mt-1">
                        <Price :value="data.price"></Price>
                        <Price through class="!text-xs ml-1"></Price>
                    </div>
                    <div class="mt-1">
                        <n-tag :type="primary" class="bg-yellow-100 text-yellow-500" size="tiny">领取优惠卷</n-tag>
                    </div>

                    <div class="!mt-auto">
                        <n-button type="primary" :loading="loading" @click="" >立即学习</n-button>
                    </div>
                </div>
            </section>
            {{ data }}
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NImage, NTag, NButton } from 'naive-ui'
const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}

const route = useRoute()
const { type, id } = route.params
const loading = ref(false)

const { data,
    error,
    pending,
    refresh } = await useCourseDetailApi({ id })
</script>
<style></style>