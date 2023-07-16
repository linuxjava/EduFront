<template>
<div class="border-b py-3 px-4 flex hover:bg-blue-50" @click="onOpen(item)">
     <n-tag v-if="item.type" type="info" size="tiny" class="mr-2">{{ o[item.type] }}</n-tag>{{ item.title }}
     <span v-if="(+item.price) === 0 || item.isfree === 1" class="ml-auto text-red-500">免费</span>
</div>
</template>
<script setup>
import {NTag} from 'naive-ui'
defineProps({
    item: Object
})

const o = {
    media: "图文",
    video: "视频",
    audio: "音频"
}

function onOpen(item){
    navigateTo(`/detail/course/${item.id}`)
}
</script>
<style>
</style>s