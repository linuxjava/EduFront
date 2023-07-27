<template>
    <div>
        <BbsTab />

        <div>
            <n-grid :x-gap="20" class="mt-4 mb-8">
                <n-grid-item :span="18" class="bg-white rounded">
                    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
                        <UiTab class="border-b">
                            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="is_top == index"
                                @click="handleIsTop(index)">
                                {{ item }}</UiTabItem>
                        </UiTab>
                        <div class="px-3">
                            <PostList v-for="(item, index) in rows" :key="index" :item="item" @delete="deletePost" :showDel="false"></PostList>
                        </div>
                        <div class="flex justify-center pt-6 pb-6">
                            <n-pagination :page="page" :item-count="total" :page-size="pageSize"
                                :on-update:page="handlePageChange" />
                        </div>
                    </LoadingGroup>
                </n-grid-item>

                <n-grid-item :span="6">
                    <NuxtLink to="">
                        <n-button type="primary" size="medium" @click="addPost" class="w-[100%] mb-4">发布帖子</n-button>
                    </NuxtLink>

                    <div class="bg-white rounded pb-6">
                        <div class="border-b h-[45px] flex items-center pl-3">
                            精品推荐
                        </div>
                        <HotList></HotList>
                    </div>
                </n-grid-item>
            </n-grid>
        </div>

    </div>
</template>
<script setup>
import { NGrid, NGridItem, NButton, NPagination } from 'naive-ui'

definePageMeta({
    middleware(to, from){
        const {bbs_id, page} = to.params
        if(!isNaN(+bbs_id) && !isNaN(+page)){
            useHead({
                title: '社区问答列表'
            })
            return true
        }

        return abortNavigation("页面不存在")
    }
})

const route = useRoute()
const bbs_id = ref(route.params.bbs_id)
const is_top = ref(route.query.is_top)
if(is_top.value != 0 && is_top.value != 1) {
    is_top.value = 0
}

const tabs = ref(['最新', '置顶'])


/**
 * 处理最新和置顶按钮点击
 * @param {*} index 
 */
function handleIsTop(index) {
    navigateTo({
        params:{
            ...route.params,
            page:1
        },
        query:{
            is_top:index
        }
    })
    is_top.value = index
    refresh()
}

let { data, pending, error, refresh,
    page, pageSize, rows, total, handlePageChange } = await usePage((
        { page, pageSize }) => {
        return usePostList(() => {
            return {
                page: page,
                limit: pageSize.value,
                bbs_id: bbs_id.value,
                is_top: is_top.value
            }
        })
    }, 10)


/**
 * 发帖
 */
 function addPost() {
    navigateTo('/post/add')
}
</script>
<style></style>