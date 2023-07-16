<template>
    <div>
        <LoadingGroup :pending="pending" :error="error">
            <n-grid :x-gap="20">
                <n-grid-item :span="6">
                    <n-card class="bg-white rounded min-h-[550px] shadow" content-style="padding: 0;"
                        footer-style="padding: 0;">
                        <div class="flex flex-col items-center py-4">
                            <n-image :src="data.cover" width="60" height="80" class="rounded shadow" />
                            <span class="mt-2">{{ data.title }}</span>
                        </div>
                        <div>
                            <n-scrollbar style="height:370px;">
                                <DetailMenu v-if="data.book_details && data.book_details.length > 0">
                                    <DetailMenuItem v-for="(item, index) in data.book_details" :key="index" :item="item"
                                        :index="index" @click="onItemClick(item)" :active="curChapaterId == item.id"></DetailMenuItem>
                                </DetailMenu>
                                <Empty v-else></Empty>
                            </n-scrollbar>
                        </div>
                    </n-card>
                </n-grid-item>
                <n-grid-item :span="18">
                    <n-card class="bg-white rounded min-h-[550px] shadow">
                        <NuxtPage :page-key="pageKey"></NuxtPage>
                    </n-card>
                </n-grid-item>
            </n-grid>
        </LoadingGroup>
    </div>
</template>
<script setup>
import { NGrid, NGridItem, NCard, NImage, NScrollbar } from 'naive-ui'

const route = useRoute()
const pageKey = computed(()=>route.fullPath)
const { book_id, id } = route.params
let curChapaterId = ref(id)

definePageMeta({
    middleware(to,from){
        const { book_id } = to.params
        if(isNaN(+book_id)){
            return abortNavigation("页面不存在")
        }
        return true
    }
})

const { data,
    error,
    pending,
    refresh } = await useCommonDetailApi('book', { id: book_id })

function onItemClick(item){
    if(!data.value.isbuy && !item.isfree) {
        useMessage().error('请先购买电子书')
        return
    }
    if(curChapaterId.value === item.id){
        return
    }
    curChapaterId.value = item.id
    navigateTo({
        params: {
            ...route.query,
            id: item.id
        }
    })
}
</script>
<style scoped></style>