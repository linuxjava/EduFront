<template>
    <div class="bg-white rounded w-[600px] mx-auto py-6 px-4 mb-6 mt-2">
            <section class="w-full mb-4" v-if="isExpire">
                <n-alert title="支付已超时" type="error">
                    请刷新页面重新支付
                </n-alert>
            </section>

            <h3 class="text-xl">微信支付</h3>
            <div class="mt-2">
                距离二维码过期还剩<TimeBox :expire="30" @end="onExpire" class="text-rose-500"></TimeBox>, 过期后请刷新页面重新获取
            </div>
            <div class="flex justify-center items-center mt-4">
                支付总额: <Price :value="data.price" class="text-sm"></Price>
            </div>

            <QrCode :data="data.code_url" v-if="data.code_url" class="mt-4"></QrCode>
            <div class="flex justify-center items-center text-green-500 mt-4">
                <n-icon :size="35">
                    <ScanCircleOutline />
                </n-icon>

                <div class="ml-3 text-gray-500 text-sm">
                    <p>请使用微信扫一扫</p>
                    <p>扫描二维码支付</p>
                </div>
            </div>
    </div>
</template>
<script setup>
import { NAlert, NIcon } from 'naive-ui'
import {
    ScanCircleOutline
} from "@vicons/ionicons5"
definePageMeta({
    middleware: ['auth']
})

const route = useRoute()
const { no } = route.query
const isExpire = ref(false)

const { data, error } = await useWxPcPay({ no })

function onExpire() {
    isExpire.value = true
}
</script>
<style scoped></style>