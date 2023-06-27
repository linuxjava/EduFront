<template>
    <UiCard>
        <UiCardHeader class="flex text-xs text-gray-400 px-4">
            <span class="">
                订单时间 {{ item.created_time }}
            </span>

            <span class="ml-auto">
                订单号 {{ item.no }}
            </span>
        </UiCardHeader>
        <UiCardBody class="flex mt-2 bg-white py-2  px-4">
            {{ item.goods }}
        </UiCardBody>

        <UiCardFooter class="flex mt-2 text-gray-400 px-4 items-center">
            <span v-if="item.type != 'default'">{{ t[item.type] }}</span>
            <Price :value="item.total_price" class="text-xs"></Price>
            <n-button type="primary" size="small" class="ml-auto" v-if="item.status === 'pendding'" @click="pay">
                立即支付
            </n-button>
            <span v-else class="ml-auto" :class="{ 'text-green-600':(item.status === 'success') }">{{ s[item.status] }}</span>
        </UiCardFooter>
    </UiCard>
</template>
<script setup>
import { NPagination, NProgress, NTag, NButton } from 'naive-ui'

const s = {
    closed:"已关闭",
    success:"支付成功",
    pendding:"等待支付",
    grouping:"拼团中"
}

const t = {
    group:"拼团",
    flashsale:"秒杀"
}

defineProps({
    item: Object
})

function pay(){
    navigateTo({
        path: '/pay'
    })
}
</script>
<style scoped></style>