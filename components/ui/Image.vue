<template>
    <img :src="src" v-bind="$attrs" @error="handlerError" :style="{'object-fit': objectFit}">
</template>
<script setup>

defineProps({
    src: {
        type: String,
        default: ""
    },
    objectFit: {
        type: String,
        default: "cover"
    },
})

function handlerError(e) {
    // 当图片加载错误时，显示错误图片,handlerError只有客户端渲染出错时才会被触发，服务端渲染不会被触发
    e.target.src = '/fail.png'
}
</script>
<style scoped></style>