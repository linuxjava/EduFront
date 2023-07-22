<template>
<span>
    {{ useToHHmmss(expire) }}
</span>
</template>
<script setup>

/**
 * 将秒转为00:00:00
 * @param {} time 单位秒
 * @returns 
 */
 function useToHHmmss(time){
    // 秒 => 时分秒
    let s;
    let hours = parseInt((time % (60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((time % (60 * 60)) / 60);
    let seconds = time % 60;
    s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return s;
}

const props = defineProps({
    expire: {
        type: Number,
        default: 120
    }
})
const emit = defineEmits(['end'])

const timer = ref(null)
const expire = ref(props.expire)

onMounted(() => initTimeBox())
onBeforeUnmount(() => {
    if(timer.value) {
        clearInterval(timer.value)
    }
})

function initTimeBox(){
    if(timer.value) {
        clearInterval(timer.value)
    }
    timer.value = setInterval(() => {
        expire.value--
        if(expire.value <= 0) {
            clearInterval(timer.value)
            emit("end")
        }
    }, 1000)
}
</script>
<style>
</style>