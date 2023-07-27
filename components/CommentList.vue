<template>
    <div class="flex pb-10">
        <n-avatar :size="40" :src="item.user.avatar"></n-avatar>
        <div class="w-full ml-2 text-gray-500">
            <div class="flex flex-col justify-between mt-[-10px]">
                <small>{{ item.user.name }}</small>
                <small><n-time :time="new Date(item.created_time)" type="datetime" /></small>
            </div>

            <n-space class="flex mt-2">
                <n-tag class="text-gray-500" :bordered="false" v-if="item.reply_user">@{{ item.reply_user.username }}</n-tag>
                {{ item.content }}
            </n-space>

            <div class="mt-2">
                <n-button v-if="!showInput" strong secondary size="small" @click="openInput" class="text-gray-500">
                    回复
                </n-button>
                <CommentInput v-else :show-cancel="true" :post_id="item.post_id" @cancel="showInput = !showInput"
                :reply_id="item.reply_id" :reply_user="item.reply_user"
                @success="emit('commentSuccess')"></CommentInput>
            </div>
            
            <n-divider class="pt-5"/>

            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { NImage, NPagination, NTime, NAvatar, NTag, NButton, NDivider, NSpace } from 'naive-ui'

defineProps({
    item: Object
})

const emit = defineEmits(['commentSuccess'])

const showInput = ref(false)
function openInput(){
    showInput.value = true
}
</script>
<style></style>