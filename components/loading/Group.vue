<template>
    <template v-if="loading">
        <slot name="loading">
            <LoadingSkeleton />
        </slot>
    </template>
    <template v-else-if="error">
        <!-- 页面错误处理 -->
        <n-result status="500" title="页面错误提示" :description="error.data?.data || '页面走丢了~'" class="mt-40" size="huge">
            <template #footer>
                <n-button @click="$router.go(-1)">返回上一页</n-button>
            </template>
        </n-result>
    </template>
    <template v-else-if="isEmpty">
        <!-- 空数据处理 -->
        <n-empty size="huge" :description="desc" class="pt-30">
        </n-empty>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>
<script setup>
import { NResult, NButton, NSkeleton, NEmpty } from 'naive-ui'
import { onBeforeUnmount } from 'vue'

const props = defineProps({
    pending: {
        type: Boolean,
        default: false
    },
    error: {
        type: [String, Boolean, Symbol],
        default: false
    },
    isEmpty: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        default: '暂无数据'
    }
})

const loading = ref(false)
const stopWatch = watchEffect(() => {
    if (props.pending && !loading.value) {
        loading.value = true
    } else {
        setTimeout(() => {
            loading.value = false
        }, 300)
    }
})

//组件卸载是关闭监听器
onBeforeUnmount(() => stopWatch())
</script>