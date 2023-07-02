<template>
    <div>
        <UiCard class="flex px-4">
            <n-tag type="info" size="small" class="mr-2">{{ item.type === 'course' ? '课程' : '专栏' }}</n-tag>
            <n-image :src="item.goods.cover" class="w-[40px] rounded mr-2" />
            <small>{{ item.goods.title }}</small>
            <n-button class="ml-auto mr-2" type="primary" size="tiny" @click="open">查看</n-button>
            <n-button type="error" size="tiny" @click="unCollect(item)" :loading="loading">删除</n-button>
        </UiCard>

    </div>
</template>
<script setup>
import { NTag, NImage, NButton } from 'naive-ui'
const props = defineProps({
    item: Object
})
const emit = defineEmits(['unCollect'])
const loading = ref(false)

const open = () => {
    navigateTo(`/detail/${props.item.type}/${props.item.goods.id}`)
}

const unCollect = (item) => {
    useDialogWarning('确定要删除该收藏吗？', '确定', '取消', async () => {
        loading.value = true
        emit('unCollect', {
            goods_id: item.goods.id,
            type: item.type,
            success() {
                useMessage().success('删除成功')
                loading.value = false
            },
            fail(){
                useMessage().success('删除失败')
                loading.value = false
            }
        })
    })
}
</script>
<style scoped></style>