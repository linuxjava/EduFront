<template>
<div class="border-b py-4">
    {{ item }}
    <n-tag type="primary" size="small" v-if="item.is_top">置顶</n-tag>
    <small>{{ item.desc.text }}</small>
</div>
</template>
<script setup>
import {NTag} from "naive-ui"
const props = defineProps({
    item: Object
})
</script>
<style>
</style>