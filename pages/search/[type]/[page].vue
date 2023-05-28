<template>
    <div>
        <h5 class="text-lg my-3">"{{ title }}"的搜索相关结果</h5>
        <UiTab>
            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="item.value === type"
                @click="tabItemClick(item)">
                {{ item.label }}</UiTabItem>
        </UiTab>
    </div>
    <LoadingGroup :pending="pending" :error="error">
        <n-grid x-gap="12" :cols="4">
            <n-gi v-for="(item, index) in rows" :key="index">
                <Course :title="item.title" :item="item"></Course>
            </n-gi>
        </n-grid>
    </LoadingGroup>
</template>
<script setup>
import { NGrid, NGi} from 'naive-ui'

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
const { type, page } = route.params

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
        page: 1,
        keyword: encodeURIComponent(title.value)
    }
})

//1.这里服务端渲染时data.value会为空，所以要判断是否为空否则服务端渲染报错
//2.注意这里获取rows要使用计算属性，因为rows有可能改变
const rows = computed(() => data.value?.rows ?? [])

//监听keyword的变化重新进行网络请求
const stop = watch(()=>route.query.keyword,(newVal)=>{
    title.value = newVal
    refresh()
})

onBeforeUnmount(()=>stop())

</script>
<style scoped></style>