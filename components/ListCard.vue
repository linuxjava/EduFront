<template>
    <div>
        <div class="flex">
            <span class="font-semibold text-1xl">{{ title }}</span>
            <n-button type="primary" quaternary class="ml-auto text-gray-400">查看更多</n-button>
        </div>

        <n-grid x-gap="20" :cols="4">
            <n-gi v-for="(item, index) in pdata" :key="index">
                <Course :item="item"></Course>
            </n-gi>
        </n-grid>
    </div>
</template>
<script setup>
import { NGrid, NGi, NButton} from 'naive-ui'

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
    const { data} = await useGroupDataApi({
        page: 1,
        usable: 1,
        limit: 8
    })

    pdata.value = data.value?.rows
}



</script>
<style scoped></style>