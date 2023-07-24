<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <n-card size="medium" class="bg-white shadow-lg pt-2 pb-1 rounded w-[450px]">
            <h4 class="text-xl text-gray-500">忘记密码</h4>
            <n-form size="normal" :show-label="false" class="mt-6" :rules="rules" :model="form" ref="formRef">
                <n-form-item path="phone">
                    <n-input type="text" v-model:value="form.phone" placeholder="手机号" size="large" clearable></n-input>
                </n-form-item>
                <n-form-item path="code" class="mt-4">
                    <n-input-group>
                        <n-input type="text" class="w-[75%]" v-model:value="form.code" placeholder="验证码" size="large" clearable/>
                        <SendCode :phone="form.phone"></SendCode>
                    </n-input-group>
                </n-form-item>
                <n-form-item class="mt-4" path="password">
                    <n-input type="password" v-model:value="form.password" placeholder="密码" size="large" clearable></n-input>
                </n-form-item>
                <n-form-item class="mt-4" path="repassword">
                    <n-input type="password"  v-model:value="form.repassword" placeholder="确认密码" size="large" clearable></n-input>
                </n-form-item>
                <div class="flex justify-between w-full mt-4">
                        <n-button text type="primary" @click="login"> 立即登录 </n-button>
                </div>

                <div class="mt-4">
                    <n-button class="w-full" type="primary" size="large" @click="resetPwd" :loading="loading">重置密码</n-button>
                </div>
            </n-form>
        </n-card>
    </div><div></div>
</template>
<script setup>
import { NCard, NForm, NFormItem, NButton, NInput, NInputGroup } from 'naive-ui'

definePageMeta({
    layout: "login",
    title: '忘记密码',
    middleware: ['only-visitor']
})

const form = ref({
    phone: "",
    code: "",
    password: "",
    repassword: ""
})
const route = useRoute()
const loading = ref(false)
const formRef = ref(null)

function validatePasswordStartWith(rule, value) {
    return form.value.password.startsWith(value) && form.value.password.length >= value.length
}

function validatePasswordSame(rule, value) {
    return form.value.password === value
}

const rules = {
    phone: [
        {
            required: true,
            message: '请输入手机号',
            trigger: ['blur']
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: ['blur']
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: ['blur']
        }
    ],
    repassword: [
        {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
        },
        {
            validator: validatePasswordStartWith,
            message: '两次密码输入不一致',
            trigger: 'input'
        },
        {
            validator: validatePasswordSame,
            message: '两次密码输入不一致',
            trigger: ['blur', 'password-input']
        }
    ]
}

function login(){
    navigateTo('/login')
}

function resetPwd() {
    formRef.value.validate(async (errors) => {
        if(errors) return

        loading.value = true
        const {data, error} = useForget(form)
        loading.value = false
        if(error.value) return

        useMessage().success('重置密码成功')
        navigateTo('/')
    })
}

</script>
<style>
</style>