<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <n-card size="medium" class="bg-white shadow-lg pt-2 pb-1 rounded w-[450px]">
            <h4 class="text-xl text-gray-500">绑定手机号</h4>
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

                <div class="mt-4">
                    <n-button class="w-full" type="primary" size="large" :loading="loading" @click="bindPhone">绑定</n-button>
                </div>
            </n-form>

        </n-card>
    </div>
</template>
<script setup>

import { NCard, NForm, NFormItem, NButton, NInput, NInputGroup } from 'naive-ui'

definePageMeta({
    title: '绑定手机号',
    layout: 'login'
})

const form = ref({
    phone: "",
    code: ""
})
const route = useRoute()
const loading = ref(false)
const formRef = ref(null)

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
    ]
}

async function bindPhone() {
    formRef.value.validate(async (errors)=>{
        if(errors)return

        loading.value = true
        const {data, error} = await useBindPhone(form)
        loading.value = false
        if(error.value) {
            return
        }

        useMessage().success('绑定成功')
        navigateTo(route.query.from || '/',{ replace:true })
    })
}

useEnterEvent(() => {
    bindPhone()
})
</script>
<style></style>