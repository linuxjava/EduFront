<template>
    <div>
        <n-card @click="open" class="cursor-pointer shadow-md !border-none
                         mt-4" content-style="padding: 0;" footer-style="padding: 0;">
            <template #cover>
                <!-- <img :src="item.cover" class="w-[100%] h-[150px]"> -->
                <UiImage :src="item.cover" class="w-[100%] h-[150px]"/>
            </template>
            <div class="h-[100%] ml-4 pt-2 truncate font-semibold">
                {{ item.title }}
            </div>
            <div class="ml-3 pb-2">
                <Price :value="item.price"></Price>
                <Price :value="item.t_price" through class="ml-1"></Price>
            </div>
            
            <template #footer v-if="item.group_id || item.flashsale_id">
                <!-- ClientOnly控制仅仅客户端渲染 -->
                <ClientOnly>
                    <div class="flex bg-yellow-500 rounded-b p-3 text-white">
                        {{ item.group_id ? '拼团中' : '秒杀中' }}
                        <CountDown :end-time="item.end_time" class="ml-auto"></CountDown>
                    </div>
                </ClientOnly>
            </template>
        </n-card>
    </div>
</template>
<script setup>
import { NCard } from 'naive-ui'

const props = defineProps({
    item: Object,
})

const open = ()=>{
    let path = ""
    // 课程详情
    if(["course","media","audio","video"].includes(props.item.type)){
        path = `/detail/course/${props.item.id}`
    }
    // 专栏详情
    else if(props.item.type == "column"){
        path = `/detail/column/${props.item.id}`
    }

    navigateTo(path)
}
</script>
<style scoped></style>