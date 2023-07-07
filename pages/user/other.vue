<template>
<div class="px-4 py-6">
    <span class="text-gray-400">其它设置</span>
    <div class="mt-4 border-b pb-4 flex">
        <span>手机号：{{ user.phone }}</span>
        <n-button type="primary" size="small" text="" @click="edit" class="ml-auto">修改</n-button>
    </div>
</div>
</template>
<script setup>
import {NButton} from 'naive-ui'
const user = useUser()
useHead({ title: '其它设置' })

function edit() {
    navigateTo("/bindphone")
}
</script>
<style>
</style>