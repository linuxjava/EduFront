<template>
    <n-button type="primary" class="w-[25%]" :disabled="!phone || (counter > 0)" @click="sendCode"
        :loading="codeLoading">
        {{ text }}
    </n-button>
</template>
<script setup>
import {NButton} from 'naive-ui'
const props = defineProps({
    phone: String
})

const codeLoading = ref(false)
const timer = ref(null)
const counter = ref(0)

const text = computed(()=>{
    if(codeLoading.value){
        return "发送中..."
    }
    if(counter.value > 0){
        return `${counter.value} s`
    }
    return "发送验证码"
})

const sendCode = async () => {
    codeLoading.value = true
    const {data, error} = await useGetCaptcha({phone: props.phone})
    codeLoading.value = false
    if(error.value) return

    if(timer.value) clearInterval(timer.value)
    counter.value = 60
    timer.value = setInterval(() => {
        counter.value--
        if(counter.value <= 0) clearInterval(timer.value)
    }, 1000)

    const msg = data.value == "ok" ? "发送成功" : `当前是演示模式，你的验证码是:${data.value}`
    useMessage().success(msg)
}
</script>
<style></style>