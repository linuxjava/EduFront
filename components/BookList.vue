<template>
    <n-card class="cursor-pointer shadow-md !border-none my-2" content-style="padding: 0;"
        footer-style="padding: 0;">
        <div class="flex p-3">
            <UiImage :src="item.cover" class="rounded w-[108px] h-[138px]" />

            <div class="flex flex-col flex-grow ml-3">
                <h1>{{ item.title }}</h1>
                <div class="mt-auto flex items-center">
                    <div class="flex items-end">
                        <Price :value="item.price" />
                        <Price :value="item.t_price" through class="ml-1" />
                    </div>
                    <n-button strong secondary round type="primary" class="ml-auto" @click="open">
                        {{ item.sub_count == 0 ? '立即订阅' : (item.sub_count + '人订阅') }}
                    </n-button>
                </div>
            </div>
        </div>
    </n-card>
</template>
<script setup>
import { NCard, NButton } from 'naive-ui'

const props = defineProps({
    item: Object,
})

const open = () => {
    navigateTo(`/detail/book/${props.item.id}`)
}
</script>
<style scoped></style>