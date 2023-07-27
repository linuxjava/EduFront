<template>
    <div>
        <p class="text-gray-500">精彩评论</p>
        <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0" desc="暂无评论">
            <div class="mt-6">
                <CommentList v-for="(item, index) in rows" :key="index" :item="item" @commentSuccess="handleCommentSuccess">
                    <CommentList v-for="(item1, index1) in item.post_comments" :key="index1" :item="item1" 
                    @commentSuccess="handleCommentSuccess">
                        
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
const page = ref(1)
const pageSize = ref(3)

let { data, pending, error, refresh, rows, total } = await usePage(() => {
        return usePostCommentList(() => {
            return {
                page: page.value,
                limit: pageSize.value,
                post_id: props.post_id
            }
        })
    }, 10)

/**
 * 详情页面评论成功和点击选择页面，这里page是要改变的
 * @param {*} p 
 */
function handlePageChange(p){
    page.value = p
    refresh()
}
defineExpose({
    handlePageChange
})

/**
 * 回复别人的评论成功，刷新评论列表，不改变page
 */
function handleCommentSuccess(){
    refresh()
}
</script>
<style></style>