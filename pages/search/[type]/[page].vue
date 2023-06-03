<template>
    <div>
        <h5 class="text-lg my-3">"{{ title }}"的搜索相关结果</h5>
        <UiTab>
            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="item.value === type" @click="tabItemClick(item)">
                {{ item.label }}</UiTabItem>
        </UiTab>
    </div>
    <LoadingGroup :pending="pending" :error="error">
        <n-grid x-gap="12" :cols="4">
            <n-gi v-for="(item, index) in rows" :key="index">
                <Course :title="item.title" :item="item"></Course>
            </n-gi>
        </n-grid>
        <div class="flex justify-center my-10">
            <n-pagination size="large" :page="page" :item-count="count" :page-size="pageSize"
                :page-sizes="[1, 8, 12, 20, 40]" show-size-picker :on-update:page="handlePageChange"
                :on-update:page-size="handlePageSizeChange" />
        </div>
    </LoadingGroup>
</template>
<script setup>
import { NGrid, NGi, NPagination } from 'naive-ui'

const tabs = [{
    label: "课程",
    value: "course"
}, {
    label: "专栏",
    value: "column"
}]

definePageMeta({
    middleware: ['search']
})

const route = useRoute()
const title = ref(route.query.keyword)
let { type, page } = route.params
const pageSize = ref(1)
//处理直接在搜索栏修改pageSize
if (route.query.pageSize && route.query.pageSize > 0) {
    pageSize.value = route.query.pageSize
}

useHead({
    title
})

function tabItemClick(item) {
    navigateTo({
        params: {
            ...route.params,
            type: item.value,
            page: 1
        },
        query: {
            ...route.query
        }
    })
}

//注意：这里使用回调函数返回动态参数，因为keyword会变化，如果直接传入对象那么refresh中的keyword不会变
const { data, pending, error, refresh } = await searchDataApi(() => {
    return {
        type,
        page: page,
        limit: pageSize.value,
        keyword: encodeURIComponent(title.value)
    }
})

//1.这里服务端渲染时data.value会为空，所以要判断是否为空否则服务端渲染报错
//2.注意这里获取rows要使用计算属性，因为rows有可能改变
const rows = computed(() => {
    // if(process.client) {
    //     data.value.rows[0].cover = 'http://test.com'
    //     console.log(data.value.rows[0])
    // }

    return data.value?.rows ?? []
})
const count = computed(() => data.value?.count)

//监听keyword的变化重新进行网络请求
const keywordWatch = watch(() => route.query.keyword, (newVal) => {
    title.value = newVal
    refresh()
})

//监听pageSize的变化重新进行网络请求
// const pageSizeWatch = watch(() => route.query.pageSize, (newVal) => {
//     refresh()
// })

onBeforeUnmount(() => {
    keywordWatch()
    // pageSizeWatch()
})

//注意page和pageSize发生变化时的区别
//1.page变化时，调用navigateTo会导致url地址发生变化，因此页面会重新初始化并加载
//2.pageSize变化时
//  2.1改变pageSize厚直接调用refresh刷新, 缺点是当切换pageSize没法将page设置为第一页
//  2.2 为了解决2.1问题，可以将pageSize放到query中

//分页页面变化监听
function handlePageChange(p) {
    navigateTo({
        params: {
            ...route.params,
            page: p
        },
        query: {
            ...route.query
        }
    })
}

//分页size变化监听
function handlePageSizeChange(ps) {
    pageSize.value = ps
    navigateTo({
        params: {
            ...route.params,
            page: 1
        },
        query: {
            ...route.query,
            pageSize: pageSize.value
        }
    })
}

</script>
<style scoped></style>