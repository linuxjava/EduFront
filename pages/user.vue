<template>
    <n-grid x-gap="20">
            <n-gi span="5">
                <div class="center-menu">
                    <ul v-for="(m, index) in menus" :key="index">
                        <li :class="{'active': (activeName === m.name)}"
                        @click="naviaget(m)">{{ m.title }}</li>
                    </ul>
                </div>
            </n-gi>
            <n-gi span='19'>
                <div class="bg-white rounded !min-h-[75vh] mb-10 pb-6">
                    <NuxtPage :page-key="pageKey" />
                </div>
            </n-gi>
        </n-grid>
</template>
<script setup>
import { NGrid, NGi } from 'naive-ui'

const menus = [{
    title:"学习记录",
    name:"user-history-page"
},{
    title:"购买记录",
    name:"user-buy-page"
},{
    title:"我的考试",
    name:"user-test-page"
},{
    title:"我的帖子",
    name:"user-post-page"
},{
    title:"优惠券记录",
    name:"user-coupon-page"
},{
    title:"我的收藏",
    name:"user-fava-page"
},{
    title:"修改资料",
    name:"user-edit"
},{
    title:"修改密码",
    name:"user-password"
},{
    title:"其他设置",
    name:"user-other"
}]

const route = useRoute()
const pageKey = computed(()=>route.fullPath)
const activeName = computed(()=>route.name)

function naviaget(m){
    navigateTo({
        name:m.name,
        params:{
            page:1
        }
    })
}

</script>
<style scoped>
.center-menu{
    @apply bg-white rounded
}

.center-menu li {
    @apply py-3 pl-6 cursor-pointer hover: (bg-blue-50)
}

.center-menu .active{
    @apply bg-gray-200 font-bold text-blue-500
}
</style>