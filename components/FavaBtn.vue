<template>
<span><NButton :type="is_fava ? 'primary' : 'default'" size="tiny" class="text-gray-400" 
strong secondary :loading="loading" @click="handleClick">收藏</NButton></span>
</template>
<script setup>
import { NButton, NTag } from 'naive-ui'

const props = defineProps({
    isFava: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'course'
    },
    goods_id: {
        type: Number,
        default: 0
    }
})

const loading = ref(false)

let is_fava = ref(props.isFava)

async function handleClick() {
    const body = {type: props.type, goods_id: props.goods_id}
    loading.value = true
    const {error, data} = is_fava.value ? await useUncollectApi(body) : await useCollectApi(body)
    loading.value = false
    if(error.value){
        return
    }
    useMessage().success(is_fava.value ? '取消收藏成功' : '收藏成功')
    is_fava.value = !is_fava.value
}
</script>
<style>
</style>