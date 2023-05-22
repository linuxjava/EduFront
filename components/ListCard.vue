<template>
    <div>
        <div class="flex">
            <span class="font-semibold text-1xl">{{ title }}</span>
            <n-button type="primary" quaternary class="ml-auto text-gray-400">查看更多</n-button>
        </div>

        <n-grid x-gap="12" :cols="4">
            <n-gi v-for="(item, index) in pdata" :key="index">
                <Course :title="title" :item="item"></Course>
            </n-gi>
        </n-grid>
    </div>
</template>
<script setup>
import { NGrid, NGi} from 'naive-ui'

const props = defineProps({
    title: String,
    data: Array,
    type:{
        type:String,
        default:"course"
    }
})

const pdata = ref(props.data || [])

if(props.type === 'group') {
    const { data} = await useFetch('pc/group/list?page=1&usable=1&limit=8', {
        key: 'GroupData',
        baseURL: 'http://demonuxtapi.dishait.cn/',
        headers: {
            appid: 'bd9d01ecc75dbbaaefce'
        },
        transform: (res) => { return res.data }
    })

    pdata.value = data.value?.rows
}



</script>
<style scoped></style>