<template>
    <div>
        <UiTab>
            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="item.value === type" @click="tabItemClick(item)">
                {{ item.label }}</UiTabItem>
        </UiTab>

        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <UserHistoryList v-for="(item, index) in rows" :key="index" :item="item"></UserHistoryList>
            <div class="flex justify-center pt-2">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NPagination, NProgress, NTag, NButton } from 'naive-ui'
const tabs = [{
    label: "课程",
    value: "course"
}, {
    label: "专栏",
    value: "column"
}]

const route = useRoute()
const type = ref(route.query.tab || 'course')
const loading = ref(false)
useHead({ title: '学习记录' })

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange, handlePageSizeChange } = await usePage((
        { page, pageSize }) => {
        return useUserHistoryApi(() => {
            return {
                page: page,
                limit: pageSize.value,
                type: type.value
            }
        })
    }, 4)


function tabItemClick(item) {
    navigateTo({
        params: {
            ...route.params,
            page: 1
        },
        query: {
            ...route.query,
            tab: item.value
        }
    })
}

</script>
<style scoped></style>