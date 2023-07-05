<template>
    <div class="pl-4 pr-10 py-6">
        <!-- size为medium, label才能居中对齐，挺奇怪的-->
        <n-form :model="form" ref="formRef" :rules="rules" label-width="80" label-placement="left" size="medium">
            <n-form-item label="用户名: ">
                <!-- input必须添加size属性，否则报错 -->
                <n-input type="text" v-model:value="user.username" disabled size="large" />
            </n-form-item>
            <n-form-item label="头像: " path="avatar">
                <!-- url: {{ form.avatar }} -->
                <uploader v-model="form.avatar"></uploader>
            </n-form-item>
            <n-form-item label="昵称: " path="nickname">
                <n-input type="text" v-model:value="form.nickname" size="large" placeholder="请输入昵称" />
            </n-form-item>
            <n-form-item label="性别: " path="sex">
                <n-radio-group v-model:value="form.sex" name="sex" :default-value="form.sex">
                    <n-space>
                        <n-radio v-for="(item, index) in options" :key="index" :value="item.value">
                            {{ item.value }}
                        </n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <div class="flex justify-end mt-4">
                <n-button type="primary" @click="onSubmit" :loading="loading">提交修改</n-button>
            </div>
        </n-form>
    </div>
</template>
<script setup>
import { NForm, NFormItem, NButton, NInput, NInputGroup, NRadioGroup, NRadio, NSpace, NModal } from 'naive-ui'

const formRef = ref(null)
const user = useUser()
const form = ref({
    avatar: "",
    nickname: "",
    sex: ""
})
const loading = ref(false)

const rules = {
    nickname: [{
        required: true,
        message: '请输入昵称',
        trigger: ['blur']
    }],
    sex: [{
        required: true,
        message: "性别不能为空"
    }]
}

const options = [{
    value: "未知"
}, {
    value: "男"
}, {
    value: "女"
}]

// 初始化form
if (user.value) {
    form.value.avatar = user.value.avatar
    form.value.nickname = user.value.nickname
    form.value.sex = user.value.sex
}

function onSubmit() {
    useFormValidate(formRef, async () => {
        loading.value = true
        const { error, data } = await useUpdateInfoApi(form)
        loading.value = false
        if (error.value) {
            return
        }

        useMessage().success('更新成功')

        //刷新用户信息
        useRefreshUserInfo()
    })
}
</script>
<style scoped></style>