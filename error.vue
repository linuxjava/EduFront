<template>
    <!-- 全局异常捕获 -->
    <n-result status="500" title="500服务器错误" :description="error.message" class="mt-40" size="huge">
        <template #footer>
            <n-button @click="handleError">回到首页</n-button>
        </template>
    </n-result>

</template>
  
<script setup>
import {NResult, NButton} from 'naive-ui'
const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
  