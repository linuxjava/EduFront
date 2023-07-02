<template>
    <div>
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <div class="px-6 pt-6 pb-3">
                <n-grid :x-gap="20" :y-gap="20" :cols="2">
                    <n-grid-item v-for="(item, index) in rows" :key="index">
                        <UserCouponList  :item="item"></UserCouponList>
                    </n-grid-item>
                </n-grid>
            </div>
            <div class="flex justify-center pt-2">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize" :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NPagination, NGridItem, NGrid } from 'naive-ui'

const route = useRoute()
useHead({ title: '优惠卷记录' })

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange, handlePageSizeChange } = await usePage((
        { page, pageSize }) => {
        return useMyCouponApi(() => {
            return {
                page: page,
                limit: pageSize.value
            }
        })
    }, 4)


</script>
<style scoped></style>