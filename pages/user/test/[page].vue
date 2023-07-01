<template>
    <div class="pt-5">
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <MyTestList v-for="(item, index) in rows" :key="index" :item="item"></MyTestList>
            <div class="flex justify-center pt-2">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NPagination} from 'naive-ui'
import MyTestList from '~/components/user/MyTestList.vue';

const route = useRoute()
useHead({ title: '我的考试' })

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange } = await usePage((
        { page, pageSize }) => {
        return useMyTestApi(() => {
            return {
                page: page,
                limit: pageSize.value
            }
        })
    }, 4)

</script>
<style scoped></style>