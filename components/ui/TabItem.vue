<template>
    <div class="item" :class="{'item-active': active}">
        <slot></slot>
    </div>
</template>
<script setup>
    const props = defineProps({
        active: Boolean,
        default: false
    })
</script>
<style scoped>
.item {
    @apply py-2 px-3 cursor-pointer text-gray-700 hover:(text-blue-400)
}

.item-active {
    border-bottom: 2px solid;
    @apply text-blue-400 border-blue-400
}
</style>