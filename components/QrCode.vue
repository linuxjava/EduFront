<template>
    <div class="flex justify-center">
        <n-image height="280px" width="280px" :src="src" class="border"/>
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

// const generateQR = async (text) => {
//   try {
//     const data = await QRCode.toDataURL(text, {
//             width:280,
//             height:280,
//             margin:3
//         })
//     console.log(data)
//     src.value = data
//   } catch (err) {
//     console.error(err)
//   }
// }

// generateQR(props.data)


</script>
<style></style>