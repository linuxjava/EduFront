<template>
    <LoadingGroup :pending="pending" :error="error">
        <template #loading>
            <LoadingCourseSkeleton></LoadingCourseSkeleton>
        </template>
        <div class="px-3">
            <Course v-for="(item, index) in data" :key="index" :item="item"></Course>
        </div>
    </LoadingGroup>
</template>
<script setup>
const { data, error, refresh, pending } = await useHotApi()
</script>
<style scoped></style>