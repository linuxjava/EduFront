<template>
    <LoadingGroup :pending="pending" :error="error">
        <!-- 如果將Banner組件放在如下template中無法顯示輪播圖很奇怪
        <template>
        </template> -->
        <template v-for="(item, index) in data" ::key="index">
            <Banner v-if="item.type == 'swiper'" :data="item.data" class="mb-6"/>
            <ImageNav v-if="item.type == 'icons'" :data="item.data" class="mb-2"/>
            <ImageAd v-if="item.type == 'imageAd'" :data="item.data" class="mb-6"/>
            <ListCard v-if="item.type == 'list'" :title="item.title" :data="item.data" class="mb-6"/>
            <!-- //拼团 -->
            <ListCard v-if="item.type == 'promotion'" :type="item.listType" :title="item.title" class="mb-6"/>
        </template>
    </LoadingGroup>
</template>

<script setup>

/**
 * 页面head配置
 */
useHead({
    title: '首页',
    meta:[
        { name:"description",content:"首页描述" },
        { name:"keywords",content:"首页关键词" },
    ],
})

const { data, pending, error, refresh } = await useIndexDataApi()

//捕获服务端渲染错误
if (process.server && error.value) {
    throw (error.value?.data?.data)
}
</script>