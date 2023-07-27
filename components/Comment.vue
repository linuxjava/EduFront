<template>
    <div>
        <p class="text-gray-500">精彩评论</p>
        <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0">
            <div class="mt-6">
                <CommentList v-for="(item, index) in rows" :key="index" :item="item" @commentSuccess="handleCommentSuccess">
                    <CommentList v-for="(item1, index1) in item.post_comments" :key="index1" :item="item1" @commentSuccess="handleCommentSuccess">
                        
                    </CommentList>
                </CommentList>
            </div>

            <div class="flex justify-center pt-6 pb-6">
                <n-pagination :page="page" :item-count="total" :page-size="pageSize"
                    :on-update:page="handlePageChange" />
            </div>
        </LoadingGroup>
    </div>
</template>
<script setup>
import {NImage, NPagination} from 'naive-ui'

const props = defineProps({
    post_id: String
})
console.log('post_id: ' + props.post_id)
const page = ref(1)
const pageSize = ref(10)

let { data, pending, error, refresh, rows, total } = await usePage(() => {
        return usePostCommentList(() => {
            return {
                page: page.value,
                limit: pageSize.value,
                post_id: props.post_id
            }
        })
    }, 10)

// 分页
function handlePageChange(p){
    page.value = p
    refresh()
}

/**
 * 回复成功，刷新评论列表
 */
function handleCommentSuccess(){
    console.log("回复成功")
    refresh()
}
</script>
<style></style>