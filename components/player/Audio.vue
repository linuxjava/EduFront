<template>
    <div id="aplayer"></div>
</template>
<script setup>
const props = defineProps({
    name: String,
    url: String,
    cover: String,
    artist: String
})

let aplayer = ref(null)
onMounted(() => {
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            name: props.name,
            artist: props.artist || 'xxxx',
            url: props.url,
            cover: props.cover
        }]
    });
    aplayer.value = ap
})

onBeforeUnmount(() => aplayer.value.destroy())
</script>
<style></style>