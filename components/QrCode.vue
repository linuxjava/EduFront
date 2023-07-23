<template>
    <div class="flex justify-center">
        <!-- 这里的宽高不能写280px，如果写上px会导致第一加载二维码不显示，必须刷新后才能显示 -->
        <n-image :src="src" class="border" height="280" width="280"/>
    </div>
</template>
<script setup>
import { NImage } from 'naive-ui'
import QRCode from 'qrcode'

const props = defineProps(['data'])

const src = ref(null)

QRCode.toDataURL(props.data,{
    width:280,
    height:280,
    margin:3
})
.then(url => {
    src.value = url
})

</script>
<style></style>