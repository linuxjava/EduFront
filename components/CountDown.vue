<template>
    <div>
        倒计时 <small>{{ data.days }}</small> 天 
        <small>{{ data.hours }}</small> : 
        <small>{{ data.minutes }}</small> : 
        <small>{{ data.seconds }}</small>
    </div>
</template>
<script setup>
const props = defineProps({
    endTime: {
        type: [String, Number]
    }
})
const emit = defineEmits(["start","end"])

const data = useCountDown(props.endTime)

function useCountDown(end_time) {
    const timeout = ref(0)
    const Timer = ref(null)

    if(typeof end_time === "string"){
        end_time = new Date(end_time).getTime()
    }

    timeout.value = (end_time - Date.now())/1000

    if(timeout.value <= 0) {
        return emit('end')
    }

    close()//先关闭定时器防止异常
    Timer.value = setInterval(() => {
        timeout.value--
        if(timeout.value <= 0) {
            close()
            return emit('end')
        }
    }, 1000)


    function close(){
        if(Timer.value) clearInterval(Timer.value)
    }

    // 将 秒 转 天/时/分/秒
    const d = computed(() => formatDiffDate(timeout.value))

    return d
}


// 毫秒 转 天/时/分/秒
function formatDiffDate(seconds) {
    let time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    if (seconds > 0) {
        time.days = Math.floor(seconds / (60 * 60 * 24));
        time.hours = Math.floor(seconds / (60 * 60)) - time.days * 24;
        time.minutes = Math.floor(seconds / 60) - time.days * 24 * 60 - time.hours * 60;
        time.seconds = Math.floor(seconds) - time.days * 24 * 60 * 60 - time.hours * 60 * 60 - time.minutes * 60;
    }

    //手动三元补零
    time.days = time.days < 10 ? "0" + time.days : time.days;
    time.hours = time.hours < 10 ? "0" + time.hours : time.hours;
    time.minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
    time.seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;

    return time
}

</script>
<style scoped>
small{
    @apply bg-white px-1 py-1 text-yellow-500 rounded-sm
}
</style>