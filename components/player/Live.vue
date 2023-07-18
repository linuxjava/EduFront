<template>
    <div id="live"></div>
</template>
<script setup>
const props = defineProps({
    url: String
})

const player = ref(null)
onMounted(() => {
    player.value = new FlvPlayer({
        id: 'live',
        url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
        width: null,
        height: 450,
        playsinline:true,
        isLive: true,
    });
})

onBeforeUnmount(()=>player.value.destroy())
</script>
<style></style>