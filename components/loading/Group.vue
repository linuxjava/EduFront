<template>
    <template v-if="loading">
        <!-- 骨架屏 -->
        <n-skeleton text style="width: 50%;margin-top: 30px;" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 50%" />

        <n-skeleton text style="width: 60%;margin-top: 30px;" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 60%" />

        <n-skeleton text style="width: 70%;margin-top: 30px;" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 70%" />

        <n-skeleton text style="width: 80%;margin-top: 30px;" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 80%" />

        <n-skeleton text style="width: 90%;margin-top: 30px;" />
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 90%" />
    </template>
    <template v-else-if="error">
        <!-- 页面错误处理 -->
        <n-result status="500" title="页面错误提示" :description="error.data?.data || '页面走丢了~'" class="mt-40" size="huge">
            <template #footer>
                <n-button @click="$router.go(-1)">返回上一页</n-button>
            </template>
        </n-result>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>
<script setup>
import { NResult, NButton, NSkeleton } from 'naive-ui'
import {onBeforeUnmount} from 'vue'

const props = defineProps({
    pending: {
        type: Boolean,
        default: false
    },
    error: {
        type: [String, Boolean, Symbol],
        default: false
    }
})

const loading = ref(false)
const stopWatch = watchEffect(() => {
    if (props.pending && !loading.value){
        loading.value = true
    } else {
        setInterval(() => {
            loading.value = false
        }, 200)
    }
})

//组件卸载是关闭监听器
onBeforeUnmount(() => stopWatch())
</script>