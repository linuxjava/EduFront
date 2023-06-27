<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <n-card size="medium" class="bg-white shadow-lg pt-2 pb-1 rounded w-[450px]">
            <h4 class="text-xl text-gray-500">{{ loginType === 'login' ? '登录' : '注册'}}</h4>
            <n-form size="normal" :show-label="false" class="mt-6" :rules="rules" :model="form" ref="formRef">
                <n-form-item path="username" label="用户名">
                    <n-input type="text" v-model:value="form.username" placeholder="用户名/手机/邮箱" size="large" clearable></n-input>
                </n-form-item>
                <n-form-item class="mt-4" path="password">
                    <n-input type="password" v-model:value="form.password" placeholder="密码" size="large" clearable></n-input>
                </n-form-item>
                <n-form-item class="mt-4" v-if="loginType === 'register'" path="repassword">
                    <n-input type="password"  v-model:value="form.repassword" placeholder="确认密码" size="large" clearable></n-input>
                </n-form-item>
                <div class="flex justify-between w-full mt-4">
                        <n-button text type="primary" @click="changeType"> {{ loginType === 'login' ? '注册' : '登录'}} </n-button>
                        <n-button text type="primary">忘记密码</n-button>
                </div>

                <div class="mt-4">
                    <n-button class="w-full" type="primary" size="large" @click="loginOrReg" :loading="loading">{{ loginType === 'login' ? '登录' : '注册'}}</n-button>
                </div>
            </n-form>

            <div class="mt-8 flex justify-center">
                注册即同意
                <n-button text type="primary" size="tiny">《服务协议》</n-button>
                和
                <n-button text type="primary" size="tiny">《隐私政策》</n-button>
            </div>
            
        </n-card>
    </div>
</template>
<script setup>
import { NCard, NForm, NFormItem, NButton, NInput } from 'naive-ui'
definePageMeta({
    layout: "login",
    middleware: ['only-visitor']
})

const title = ref('登录')
useHead({
    //注意这里的值必须设置为响应式的，否则下面切换时浏览器上的title不会变化
    title: title
})

const route = useRoute()
const formRef = ref(null)
const loading = ref(false)
const loginType = ref('login')
const form = ref({
    username: "",
    password: "",
    repassword: ""
})

function validatePasswordStartWith(rule, value) {
    return form.value.password.startsWith(value) && form.value.password.length >= value.length
}

function validatePasswordSame(rule, value) {
    return form.value.password === value
}

const rules = computed(() => {
    let r = {
        username: [
            {
                required: true,
                message: loginType.value === 'login' ? '用户名/手机号/邮箱必填' : '用户名必填',
                trigger: ['blur']
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
                trigger: ['blur']
            }
        ]
    }

    if(loginType.value === 'register') {
        r.repassword = [
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

    return r
})

function changeType(){
    loginType.value = loginType.value === 'login' ? 'register' : 'login'
    title.value = loginType.value === 'login' ? '登录' : '注册'
    //route.meta.title = ''//这个动态设置没用
    formRef.value.restoreValidation()
    form.username = ''
    form.password = ''
    form.repassword = ''
}

function loginOrReg(){
    formRef.value.validate(async (errors) => {
        if(errors) {
            return
        }

        const isLogin = loginType.value === 'login'
        loading.value = true
        const {data, error} =  isLogin ? await useLoginApi(form) : await useRegisterApi(form)
        loading.value = false
        if(error.value) return

        useMessage().success(loginType.value === "login" ? "登录成功" : "注册成功")
        
        if(isLogin) {
            //保存token
            const token = useCookie("token")
            token.value = data.value.token
            //保存用户信息
            const user =  useUser()
            user.value = data.value

            navigateTo(route.query.from || '/', {replace: true})
        } else {
            // 切换回登录页
            changeType()
        }
    })
}

//监听enter
function handleKeydownEvent(e) {
    if(e.key === 'Enter') {
        loginOrReg()
    }
}

onMounted(() => document.addEventListener('keydown', handleKeydownEvent))
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydownEvent))

</script>
<style scoped></style>