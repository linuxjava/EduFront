<template>
    <n-grid x-gap="20" :cols="4">
        <n-gi v-for="(item, index) in data" :key="index">
            <n-card @click="$commonOpen(item)" class="cursor-pointer">
                <template #cover>
                    <img :src="item.src" class="w-[100%] h-[90px]">
                </template>
                <div class="text-center h-[100%] mt-[10px]">
                    {{ item.name }}
                </div>
            </n-card>
        </n-gi>
    </n-grid>
</template>
<script setup>
import { NGrid, NGi, NCard } from 'naive-ui'

defineProps({
    data: Array
})

</script>
<style scoped>
</style>