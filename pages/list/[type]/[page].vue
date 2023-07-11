<template>
    <div>
        <n-breadcrumb>
            <n-breadcrumb-item><NuxtLink to="/">首页</NuxtLink></n-breadcrumb-item>
            <n-breadcrumb-item>{{ title }}</n-breadcrumb-item>
        </n-breadcrumb>
        <LoadingGroup :pending="pending" :error="error">
            <template #loading>
                <LoadingCourseSkeleton></LoadingCourseSkeleton>
            </template>
            <n-grid x-gap="20" :cols="4">
                <n-gi v-for="(item, index) in rows" :key="index">
                    <Course :item="item"></Course>
                </n-gi>
            </n-grid>
            <div class="flex justify-center my-10">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize" :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NGrid, NGi, NPagination, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
definePageMeta({
    middleware: ['list']
})

const route = useRoute()
const title = route.meta.title
const {type} = route.params

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange } = await usePage((
        { page, pageSize }) => {
        return useCommonListApi(type, () => {
            return {
                page: page,
                limit: pageSize.value
            }
        })
    }, 8)
</script>
<style></style>