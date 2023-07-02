<template>
    <div>
        <n-card title="" size="medium" class="coupon cursor-pointer" :class="{ 'coupon-disable': btn !== '立即使用' }">
            <div>
                <Price :value="item.price" class="!text-xl !text-white"></Price>
            </div>
            <p class="text-sm">适用课程：{{ item.title }}</p>
            <p>有效期：{{ item.start_time }} ~ {{ item.end_time }}</p>
            <template #footer>
                <div class="flex justify-end">
                    <n-button :type="btn != '立即使用' ? '' : 'warning'" :disabled="btn != '立即使用'" @click="open(item)">
                        {{ btn }}
                    </n-button>
                </div>
            </template>
        </n-card>
    </div>
</template>
<script setup>
import { NCard, NButton } from "naive-ui"
const props = defineProps({
    item: Object
})

const btn = computed(() => {
    const v = props.item
    v.expired = (new Date(v.end_time)).getTime() < (new Date()).getTime()
    return v.used ? '已使用' : (v.expired ? '已过期' : '立即使用')
})

function open(item){
    navigateTo(`/createorder?id=${item.goods_id}&type=${item.type}`)
}
</script>
<style scoped>
.coupon {
    @apply bg-orange-500;
}

.coupon p{
    @apply mt-2 text-light-300
}

.coupon-disable {
    @apply !bg-gray-300;
}
</style>