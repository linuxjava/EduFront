<template>
    <n-carousel show-arrow autoplay>
        <img class="carousel-img cursor-pointer rounded" v-for="(item, index) in data" 
        :key="index" :src="item.src" @click="$commonOpen(item)">
    </n-carousel>
</template>

<script setup>
import {NCarousel } from 'naive-ui'

defineProps({
    data: Array
})

</script>
<style scoped>
.carousel-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
}
</style>