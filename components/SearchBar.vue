<template>
    <n-drawer v-model:show="drawer" placement="top" :on-after-enter="addKeydownEvent"
         :on-after-leave="removeKeydownEvent">
            <!-- 这里需要用div包起来然后设置居中，否则不行 -->
            <div class="h-full items-center flex">
                <n-input-group class="flex justify-center">
                    <n-input v-model:value="keyword" size="large" :style="{ width: '500px' }" placeholder="请输入搜索内容" />
                    <n-button size="large" type="primary" ghost :disabled="!keyword" @click="handleSerach">
                        搜索
                    </n-button>
                </n-input-group>
            </div>
        </n-drawer>
</template>
<script setup>

import { NDrawer, NInputGroup, NInput, NButton } from 'naive-ui'

const drawer = ref(false)
const keyword = ref("")


const open = () => {
    drawer.value = true
    keyword.value = ''
}

const handleSerach = () => {
    setTimeout(() => {
        drawer.value = false
    }, 200)
    navigateTo({
        name: 'search-type-page',
        params: {
            type: 'course',
            page: 1
        },
        query: {
            keyword: keyword.value
        }
    })
}

function handleKeydownEvent(e) {
    if(e.key === 'Enter' && keyword.value) {
        handleSerach()
    }
}

const addKeydownEvent = () => document.addEventListener('keydown', handleKeydownEvent)
const removeKeydownEvent = () => document.removeEventListener('keydown', handleKeydownEvent)

defineExpose({
    open
})

</script>
<style scoped></style>