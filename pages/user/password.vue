<template>
    <div class="pl-4 pr-10 py-6">
        <!-- size为medium, label才能居中对齐，挺奇怪的-->
        <n-form :model="form" ref="formRef" :rules="rules" label-width="100" label-placement="left" size="medium">
            <n-form-item label="原密码: " path="opassword">
                <!-- input必须添加size属性，否则报错 -->
                <n-input type="password" v-model:value="form.opassword" size="large" placeholder="请输入原密码" clearable />
            </n-form-item>
            <n-form-item label="新密码: " path="password">
                <n-input type="password" v-model:value="form.password" size="large" placeholder="请输入新密码" clearable />
            </n-form-item>
            <n-form-item label="确认密码: " path="repassword">
                <n-input type="password" v-model:value="form.repassword" size="large" placeholder="请输入确认密码" clearable />
            </n-form-item>

            <div class="flex justify-end mt-4">
                <n-button type="primary" @click="onSubmit" :loading="loading">立即修改</n-button>
            </div>
        </n-form>
    </div>
</template>
<script setup>
import { NForm, NFormItem, NButton, NInput, NInputGroup, NRadioGroup, NRadio, NSpace, NModal } from 'naive-ui'
useHead({ title: '修改密码' })
const formRef = ref(null)
const form = ref({
    opassword: "",
    password: "",
    repassword: ""
})
const loading = ref(false)

function validatePasswordStartWith(rule, value) {
    return form.value.password.startsWith(value) && form.value.password.length >= value.length
}

function validatePasswordSame(rule, value) {
    return form.value.password === value
}

const rules = {
    opassword: [{
        required: true,
        message: '请输入原密码',
        trigger: ['blur']
    }],
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

function onSubmit() {
    useFormValidate(formRef, async () => {
        loading.value = true
        const { error, data } = await useUpdatePasswordAPi(form)
        loading.value = false
        if (error.value) {
            return
        }

        useMessage().success('修改密码成功')
        
        await useLogout()
    })
}

</script>
<style scoped></style>