<template>
    <div class="bg-white rounded p-4">
        <section>
            <h4 class="text-sm text-gray-500">产品信息</h4>
            <div class="flex mt-3">
                <n-image :src="data.cover" class="w-[180px] h-[100px]" />
                <div class="flex flex-col ml-4 w-[100%]">
                    <h5 class="flex">
                        <span class="text-base text-gray-600">{{ data.title }}</span>
                        <Price :value="data.price" class="ml-auto"></Price>
                    </h5>
                    <div class="mt-auto ">
                        <n-tag type="default" class="!text-gray-400">{{ t[data.type] }}</n-tag>
                    </div>
                </div>
            </div>
        </section>

        <section class="mt-6" v-if="data.price > 0">
            <h4 class="text-sm text-gray-500">优惠券</h4>
            <div class="flex mt-3">
                <span v-if="couponData.rows.length === 0" class="text-gray-300">暂无优惠券</span>
                <n-grid :x-gap="20" :cols="4" v-else>
                    <n-grid-item v-for="(item, index) in couponData.rows" :key="index">
                        <n-button strong secondary :type="curCoupon && curCoupon.id == item.id ? 'warning' : 'tertiary'"
                            @click="onClickCoupon(item)">￥{{ item.price }} 优惠券</n-button>
                    </n-grid-item>
                </n-grid>
            </div>
        </section>

        <section class="mt-6">
            <h4 class="text-sm text-gray-500">支付方式</h4>
            <div class="flex mt-4">
                <span class="pay-icon" :class="{'pay-icon-active': curPayType == 'wechat'}" @click="choosePayType('wechat')">
                    <n-icon>
                        <LogoWechat />
                    </n-icon>
                    <b class="ml-1">微信支付</b>
                </span>

                <span class="pay-icon ml-2" :class="{'pay-icon-active': curPayType == 'zfb'}" @click="choosePayType('zfb')">
                    <n-icon>
                        <LogoAlipay />
                    </n-icon>
                    <b class="ml-1">支付宝支付</b>
                </span>
            </div>
        </section>

        <section class="mt-6">
            <span class="text-red-500">请在30分钟内完成支付</span>
            <div class="flex">
                <div class="flex ml-auto items-center text-xs">
                    <span v-if="curCoupon">优惠券已抵扣 <b class="text-red-500">{{ curCoupon.price }}</b>元，</span>
                    <span>需支付<Price :value="payMoney" class="!text-sm"/></span><br/>
                </div>
            </div>
            <div class="flex mt-2">
                <n-button type="primary" size="medium" @click="pay" class="ml-auto" :loading="loading" :disabled="data.price == 0">确认支付</n-button>
            </div>
        </section>
    </div>
</template>
<script setup>
import { NImage, NTag, NGrid, NGridItem, NButton, NIcon } from 'naive-ui'
import {
    LogoWechat, LogoAlipay
} from "@vicons/ionicons5"

definePageMeta({
    middleware: ['auth', 'createorder']
})

const t = {
    media: "图文",
    audio: "音频",
    video: "视频",
    column: "专栏",
    book: "电子书",
    course: "课程"
}

const route = useRoute()
const { id, type } = route.query

const { data, error } = await useGetGoodsInfoApi({ id, type })


const { data: couponData, error: couponError } = await useGetUserCouponApi({ goods_id: id, type, page: 1 })

//点击优惠券
const curCoupon = ref(null)
function onClickCoupon(item) {
    if (curCoupon.value && (curCoupon.value.id == item.id )) {
        curCoupon.value = null
    } else {
        curCoupon.value = item
    }
}

//选择支付类型
const curPayType = ref('')
function choosePayType(type){
    if(curPayType.value == type) {
        curPayType.value = ''
    }else{
        curPayType.value = type
    }
}

const payMoney = computed(() => {
    if(curCoupon.value) {
        return (data.value.price * 1000 - (+curCoupon.value.price)  * 1000) / 1000
    }
    
    return data.value.price;
})

//支付
const loading = ref(false)
async function pay() {
    const d = {goods_id: id, type}
    if(curCoupon.value) {
        d.user_coupon_id = curCoupon.value.id
    }
    loading.value = true
    const {data: orderData, error: orderError} = await useCreateOrder(d)
    loading.value = false
    if(orderError.value){
        return
    }

    useMessage().success('创建订单成功')
    navigateTo(`/pay?no=${orderData.value.no}`, {replace: true})
}
</script>
<style>
.pay-icon {
    @apply flex justify-center items-center px-4 py-2 border rounded border-green-600 text-green-600
}
.pay-icon-active {
    @apply bg-green-600 text-white
}
</style>