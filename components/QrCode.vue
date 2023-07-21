<template>
    <div class="flex justify-center">
        <n-image height="280px" width="280px" :src="src" class="border p-1"/>
    </div>
</template>
<script setup>
import {NImage} from 'naive-ui'
import QRCode from 'qrcode'

const props = defineProps(['data'])

const src = ref(null)
QRCode.toDataURL(props.data,{
    width:280,
    height:280,
    margin:2
})
.then(url => {
    src.value = url
})

</script>
<style>
</style>