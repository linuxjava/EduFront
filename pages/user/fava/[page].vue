<template>
    <div class="pt-5">
        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <UserFavaList v-for="(item, index) in rows" :key="index" :item="item" @unCollect="unCollect"></UserFavaList>
            <div class="flex justify-center pt-2">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NPagination} from 'naive-ui'

const route = useRoute()
useHead({ title: '我的收藏' })

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange } = await usePage((
        { page, pageSize }) => {
        return useMyFaveApi(() => {
            return {
                page: page,
                limit: pageSize.value
            }
        })
    }, 4)


async function unCollect({goods_id, type, success, fail}){
    const {error} = await useUncollectApi({goods_id, type})
    if(error.value) {
        fail()
        return
    }

    success()
    refresh()
}

</script>
<style scoped></style>