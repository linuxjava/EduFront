<template>
    <div>
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <div class="px-6 pt-6 pb-3">
                <PostList v-for="(item, index) in rows" :key="index" :item="item"></PostList>
            </div> 
            <div class="flex justify-center pt-2">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NPagination, NProgress, NTag, NButton } from 'naive-ui'

const route = useRoute()
useHead({ title: '我的帖子' })

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange, handlePageSizeChange } = await usePage((
        { page, pageSize }) => {
        return useMyPostApi(() => {
            return {
                page: page,
                limit: pageSize.value
            }
        })
    }, 4)


</script>
<style scoped></style>