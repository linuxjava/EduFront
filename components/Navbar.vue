<template>
    <div class="navbar">
        <!-- items-center只有设置了固定高度min-h-[60px]才有效 -->
        <div class="edu-container flex items-center min-h-[60px]">
            <n-button text class="text-xl font-bold mr-5">笛莎编程</n-button>
            <!-- <div class="menu">
                <div class="menu-item" v-for="(item, index) in menus" :key="index"
                 @click="handleMenuClick(item)" :class="{'menu-item-active': (route.path === item.path)}"
                 >{{ item.name }}</div>
            </div> -->

            <UiMenu>
                <UiMenuItem v-for="(item, index) in menus" :key="index" @click="handleMenuClick(item)"
                    :active="isMenuItemActive(item)">
                    {{ item.name }}</UiMenuItem>
            </UiMenu>

            <n-button circle class="ml-auto mr-3" @click="search">
                <template #icon>
                    <Search></Search>
                </template>
            </n-button>

            <NuxtLink to="/login">
                <n-button text size="large">登录</n-button>
            </NuxtLink>

            <!-- <n-dropdown :options="userOptions">
                <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </n-dropdown> -->
        </div>
    </div>
    <div class="w-[100%] h-[80px]"></div>
    <SearchBar ref="SearchBarRef"></SearchBar>
</template>
<script setup lang="ts">
import { NButton, NIcon, NDropdown, NAvatar } from 'naive-ui'
import {
    Search,
    PersonCircleOutline as UserIcon,
    LogOutOutline as LogoutIcon
} from "@vicons/ionicons5"
import type { Component } from 'vue'
import { activeHead } from 'unhead';

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}

const route = useRoute()

const SearchBarRef = ref(null)

const menus = [{
    name: "首页",
    path: "/",
}, {
    name: "考试",
    path: "/paper/1",
    match: [
        { name: 'paper-page' }
    ]
}, {
    name: "拼团",
    path: "/list/group/1",
    match: [
        {
            name: 'list-type-page',
            params: {
                type: 'group'
            }
        }
    ]
}, {
    name: "秒杀",
    path: "/list/flashsale/1",
    match: [
        {
            name: 'list-type-page',
            params: {
                type: 'flashsale'
            }
        }
    ]
}, {
    name: "直播",
    path: "/list/live/1",
    match: [
        {
            name: 'list-type-page',
            params: {
                type: 'live'
            }
        }
    ]
}, {
    name: "专栏",
    path: "/list/column/1",
    match: [
        {
            name: 'list-type-page',
            params: {
                type: 'column'
            }
        }
    ]
}, {
    name: "电子书",
    path: "/list/book/1",
    match: [
        {
            name: 'list-type-page',
            params: {
                type: 'book'
            }
        }
    ]
}, {
    name: "社区",
    path: "/bbs/0/1",
    match: [
        { name: 'bbs-bbs_id-page' }
    ]
}, {
    name: "课程",
    path: "/list/course/1",
    match: [
        {
            name: 'list-type-page',
            params: {
                type: 'course'
            }
        }
    ]
}]

const userOptions = [{
    label: "用户中心",
    key: "center",
    icon: renderIcon(UserIcon)
}, {
    label: "退出",
    key: "logout",
    icon: renderIcon(LogoutIcon)
}]

const isMenuItemActive = (item) => {
    if(item.match) {
        return item.match.findIndex(menuMatch => {
            //先检查name是否一致，name相同，如果有params.type的话继续进行匹配
            let res = true
            if(menuMatch.params && menuMatch.params.type) {
                res = menuMatch.params.type === route.params.type
            }

            return menuMatch.name === route.name && res
        }) != -1
    }

    return route.path === item.path
}


function handleMenuClick(item) {
    navigateTo(item.path)
}

/**
 * 点击搜索
 */
function search() {
    SearchBarRef.value.open()
}

</script>
<style>
.navbar {
    z-index: 1000;
    @apply bg-white shadow-sm fixed left-0 top-0 right-0;
}
</style>