<template>
    <span :class="through ? 'text-gray-500 text-xs line-through' : 'text-base text-rose-500'">
            {{ parseFloat(value) == 0 ? '免费' : "￥"+value }}
    </span>
</template>
<script setup>
const props = defineProps({
    value: {
        type: [String, Number],
        default: 0
    },
    through:{
        type:Boolean,
        default:false
    }
})
</script>
<style scoped></style>