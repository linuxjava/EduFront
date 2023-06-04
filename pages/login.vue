<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <n-card size="medium" class="bg-white shadow-lg pt-2 pb-1 rounded w-[450px]">
            <h4 class="text-xl text-gray-500">{{ loginType === 'login' ? '登录' : '注册'}}</h4>
            <n-form size="normal" class="mt-6">
                <n-form-item>
                    <n-input type="text" placeholder="用户名/手机/邮箱" size="large" clearable @change=""></n-input>
                </n-form-item>
                <n-form-item class="mt-4">
                    <n-input type="password" placeholder="密码" size="large" clearable @change=""></n-input>
                </n-form-item>
                <n-form-item class="mt-4" v-if="loginType === 'register'">
                    <n-input type="password" placeholder="确认密码" size="large" clearable @change=""></n-input>
                </n-form-item>
                <n-form-item>
                    <div class="flex justify-between w-full mt-4">
                        <n-button text type="primary" @click="loginAndReg"> {{ loginType === 'login' ? '注册' : '登录'}} </n-button>
                        <n-button text type="primary">忘记密码</n-button>
                    </div>
                </n-form-item>

                <n-form-item class="mt-4">
                    <n-button class=" w-full" type="primary" size="large" @click="">{{ loginType === 'login' ? '登录' : '注册'}}</n-button>
                </n-form-item>
            </n-form>

            <div class="mt-8 flex justify-center">
                注册即同意<span class="text-green-700">《服务协议》</span>和<span class="text-green-700">隐私政策</span>
            </div>
            
        </n-card>
    </div>
</template>
<script setup>
import { NCard, NForm, NFormItem, NButton, NInput } from 'naive-ui'
definePageMeta({
    layout: "login"
})

const title = ref('登录')
useHead({
    //注意这里的值必须设置为响应式的，否则下面切换时浏览器上的title不会变化
    title: title
})

const route = useRoute()
const loginType = ref('login')

function loginAndReg(){
    loginType.value = loginType.value === 'login' ? 'register' : 'login'
    title.value = loginType.value === 'login' ? '登录' : '注册'
    //route.meta.title = ''//这个动态设置没用
}

</script>
<style scoped></style>