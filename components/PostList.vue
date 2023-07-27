<template>
    <div class="border-b py-4" @click="gotoDetail">
        <n-tag type="primary" size="small" v-if="item.is_top">置顶</n-tag>
        {{ item.desc.text }}
        <div style="max-width:500px;" class="cursor-pointer my-3">
            <n-image-group>
                <n-image :src="url" v-for="(url, index) in item.desc.images" :key="index" class="mr-3 rounded"
                style="object-fit: cover;" :class="item.desc.images.length === 1 ? 'one-img' : 'multi-img'"
                @click.stop=""/>
            </n-image-group>
        </div>

        <div class="flex">
            <n-button icon-placement="left" secondary strong size="tiny" 
            class="mr-3" @click.stop="handleSupport(item)" :loading="supportLoading"
            :type="item.issupport ? 'primary' : 'tertiary'">
                <template #icon>
                    <n-icon>
                        <ThumbsUpSharp />
                    </n-icon>
                </template>
                点赞{{ item.support_count || ''}}
            </n-button>

            <n-button icon-placement="left" secondary strong size="tiny" 
            class="mr-3" v-on:click.stop="comment(item)">
                <template #icon>
                    <n-icon>
                        <ChatboxEllipsesOutline />
                    </n-icon>
                </template>
                评论{{ item.comment_count || ''}}
            </n-button>

            <span class="mr-3">作者：{{ item.user.name }}</span>

            <n-button type="error" size="tiny" @click="deletePost(item)" :loading="deleteLoading" v-if="showDel">删除</n-button>
            
        </div>
    </div>
</template>
<script setup>
import { NTag, NImage, NButton, NIcon, NImageGroup } from "naive-ui"
import {
    ThumbsUpSharp,
    ChatboxEllipsesOutline
} from '@vicons/ionicons5'
const props = defineProps({
    item: Object,
    showDel: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['delete'])

const {supportLoading, handleSupport} = useHandleSupportPost()

function comment(item) {
}

const deleteLoading = ref(false)
function deletePost(item) {
    useDialogWarning('确定要删除该帖子吗?', '确定', '取消', () => {
        deleteLoading.value = true
        emit('delete', {
            id: props.item.id,
            success() {
                useMessage().success('删除成功')
                loading.value = false
            },
            fail(){
                loading.value = false
            }
        })
    })
}

/**
 * 帖子详情
 */
function gotoDetail(){
    navigateTo(`/post_detail/${props.item.id}`)
}
</script>

<style>
.multi-img {
    @apply w-[150px] h-[100px]
}

.one-Img {
    @apply w-[300px] h-[200px]
}
</style>