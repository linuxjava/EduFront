<template>
    <div class="bg-white rounded w-[600px] mx-auto py-6 px-4 mb-6 mt-2">
        <ClientOnly>
            <section class="w-full mb-4" v-if="isExpire">
                <n-alert title="支付已超时" type="error">
                    请刷新页面重新支付
                </n-alert>

                <n-alert title="支付成功" type="success" v-if="isPaySucc">
                    正在跳转...
                </n-alert>
            </section>

            <h3 class="text-xl">微信支付</h3>
            <div class="mt-2">
                距离二维码过期还剩<TimeBox :expire="1800" @end="onExpire" class="text-rose-500"></TimeBox>, 过期后请刷新页面重新获取
            </div>
            <div class="flex justify-center items-center mt-4">
                支付总额: <Price :value="data.price" class="text-sm"></Price>
            </div>

            <QrCode :data="data.code_url" v-if="data.code_url" class="mt-4"/>
            <div class="flex justify-center items-center text-green-500 mt-4">
                <n-icon :size="35">
                    <ScanCircleOutline />
                </n-icon>

                <div class="ml-3 text-gray-500 text-sm">
                    <p>请使用微信扫一扫</p>
                    <p>扫描二维码支付</p>
                </div>
            </div>
        </ClientOnly>
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

useHead({
    title: '订单支付'
})

const route = useRoute()
const { no } = route.query
const isExpire = ref(false)

const { data, error } = await useWxPcPayApi({ no })

function onExpire() {
    isExpire.value = true
}

const timer = ref(null)
const isPaySucc = ref(false)
startInterval()
//启动定时器检查订单是否已支付
function startInterval(){
    if(timer.value) {
        clearInterval(timer.value)
    }

    timer.value = setInterval(() => {
        checkIsPaySucc()
    }, 5000)
}

function checkIsPaySucc(){
    //A composable that requires access to the Nuxt instance was called outside of a plugin, 
    // Nuxt hook, Nuxt middleware, or Vue setup function
    //composable方法只能在上面场景中直接调用，如果在此方法中使用await useIsPaySuccApi，服务端会报上面错误
    //因此需要改为如下方式
    useIsPaySuccApi({no}).then(res=>{
        if(!res.error.value && res.data.value.trade_state == "SUCCESS"){
            clearInterval(timer.value)
            isPaySucc.value = true

            setTimeout(() => {
                navigateTo('/user/buy/1', {replace: true})
            }, 3000)
        }
    })

    // const {data, error} = await useIsPaySuccApi({no})
    // if(error.value){
    //     if(timer.value) {
    //         clearInterval(timer.value)
    //     }
    //     return
    // }

    // if(data.value.trade_state == 'NOTPAY'){
    //     return
    // }

    // clearInterval(timer.value)
    // isPaySucc.value = true

    // timer.value = setInterval(() => {
    //     clearInterval(timer.value)
    //     navigateTo('/user/buy/1', {replace: true})
    // }, 5000)
}

onBeforeUnmount(() => {if(timer.value) clearInterval(timer.value)})
</script>
<style scoped></style>