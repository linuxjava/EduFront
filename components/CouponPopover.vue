<template>
    <div>
        <n-popover :overlap="overlap" placement="right-start" trigger="click">
            <template #trigger>
                <n-tag :type="primary" class="bg-yellow-100 text-yellow-500" size="tiny">领取优惠卷</n-tag>
            </template>
            <div class="large-text w-[450px]">
                <n-scrollbar style="max-height: 600px">
                    <CouponList v-for="(item, index) in data" :item="item"></CouponList>
                    <!-- <n-card v-for="(item, index) in data" :key="index" size="small" class="coupon cursor-pointer mb-3">
                        <div>
                            <Price :value="item.price" class="!text-base"></Price>
                        </div>
                        <p class="text-sm">适用课程：{{ item.value.title }}</p>
                        <p>有效期：<n-time :time="new Date(item.start_time)"/> ~ <n-time :time="new Date(item.end_time)"/></p>
                        <template #footer>
                            <div class="flex justify-end">
                                <n-button :type="warning" @click="open(item)" size="small">
                                    立即使用
                                </n-button>
                            </div>
                        </template>
                    </n-card> -->
                </n-scrollbar>
            </div>
        </n-popover>
    </div>
</template>
<script setup>
import { NPopover, NButton, NTag, NCard, NScrollbar, NTime } from 'naive-ui';

const { data, error } = await useCouponListApi()

// const btn = computed(() => {
//     const v = props.item
//     v.expired = (new Date(v.end_time)).getTime() < (new Date()).getTime()
//     return v.used ? '已使用' : (v.expired ? '已过期' : '立即使用')
// })
</script>
<style>
</style>
