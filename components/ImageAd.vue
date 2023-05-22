<template>
    <div>
        <img v-for="(item, index) in data" :src="item.src" class="w-[100%] h-[100px] 
        rounded cursor-pointer" @click="$commonOpen(item)">
    </div>
</template>
<script setup>
    defineProps({
        data: Array
    })
</script>
<style scoped></style>