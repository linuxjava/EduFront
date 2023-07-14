<template>
    <div>
        <n-card size="small" class="coupon cursor-pointer mb-3" :class="{'coupon-disable' : isGetCoupon}">
            <div>
                <Price :value="item.price" class="!text-base !text-white"></Price>
            </div>
            <p class="text-sm">适用课程：{{ item.value.title }}</p>
            <p>有效期：<n-time :time="new Date(item.start_time)" /> ~ <n-time :time="new Date(item.end_time)" /></p>
            <template #footer>
                <div class="flex justify-end">
                    <n-button :type="isGetCoupon ? '' : 'warning'" @click="submit(item)" size="small"
                     class="text-white" :disabled="isGetCoupon" :loading="loading">
                        {{ isGetCoupon ? '已领取' : '立即领取' }} 
                    </n-button>
                </div>
            </template>
        </n-card>
    </div>
</template>
<script setup>
import { NPopover, NButton, NTag, NCard, NScrollbar, NTime } from 'naive-ui';

const props = defineProps({
    item: Object
})

const loading = ref(false)
const isGetCoupon = ref(props.item.isgetcoupon)

function submit(item) {
    useHasAuth(async () => {
        loading.value = true
        const {data, error} =  await useCouponReceive({coupon_id: item.id})
        loading.value = false
        if(error.value){
            return
        }
        isGetCoupon.value = true
        useMessage().success('领取成功')
    })
}
</script>
<style>
.coupon {
    @apply !bg-orange-500;
}

.coupon p{
    @apply mt-2 text-light-300
}

.coupon-disable {
    @apply !bg-gray-300;
}
</style>