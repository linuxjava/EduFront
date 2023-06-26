<template>
    <div class="pt-5">
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <UserOrderList v-for="(item, index) in rows" :key="index" :item="item"></UserOrderList>
            <div class="flex justify-center pt-2">
                <n-pagination size="large" :page="page" :item-count="total" :page-size="pageSize"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NPagination} from 'naive-ui'

const route = useRoute()
useHead({ title: '购买记录' })

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange } = await usePage((
        { page, pageSize }) => {
        return useOrderListApi(() => {
            return {
                page: page,
                limit: pageSize.value
            }
        })
    }, 4)

</script>
<style scoped></style>