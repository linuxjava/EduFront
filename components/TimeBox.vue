<template>
<span>
    {{ useToHHmmss(expire) }}
</span>
</template>
<script setup>

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