<template>
    <div class="border-b py-3 px-4 flex items-center hover:bg-gray-100" :class="{'active': active}">
        <n-tag v-if="item.type" type="info" size="tiny" class="mr-2">{{ o[item.type] }}</n-tag>
        <n-space>
            <span>第{{ index + 1 }}章节</span>
            <span>{{ item.title }}</span>
        </n-space>
        <span v-if="(+item.price) === 0 || item.isfree === 1" class="ml-auto text-red-500">免费</span>
    </div>
</template>
<script setup>
import { NTag, NSpace } from 'naive-ui'
defineProps({
    item: Object,
    index: Number,
    active:{
        type:Boolean,
        default:false
    }
})

const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}

</script>
<style>
.active{
    @apply !bg-gray-200
}
</style>