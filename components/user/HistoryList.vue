<template>
    <UiCard>
        <UiCardHeader class="mx-4">
            <span class="text-xs text-gray-400">
                学习进度
            </span>
            <n-progress type="line" :show-indicator="false" :percentage="item.progress" class="mt-3" />
        </UiCardHeader>
        <UiCardBody class="flex mt-4 mx-4">
            <n-tag type="default" size="medium" class="rounded text-xs text-gray-500">{{ t[item.type] }}</n-tag>
            <span class="ml-2">{{ item.title }}</span>
            <n-button :type="item.progress >= 100 ? 'tertiary' : 'primary'" class="ml-auto" size="small" @click=""> {{
                item.progress >= 100 ? '学习完成' : '继续观看' }}</n-button>
        </UiCardBody>
    </UiCard>
</template>
<script setup>
import { NPagination, NProgress, NTag, NButton } from 'naive-ui'

const props = defineProps({
    item: Object
})

const t = {
    audio: "音频",
    video: "视频",
    media: "图文",
    column: "专栏",
    book: "电子书",
    course: "课程"
}
</script>
<style scoped></style>