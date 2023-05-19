<template>
        <div class="menu-item" :class="{'menu-item-active': active}">
            <slot></slot>
        </div>
</template>
<script setup>
    defineProps({
        active: {
            type: Boolean,
            default: false
        }
    })
</script>
<style>
.menu-item {
    @apply px-2 py-1 mx-1 rounded hover:(bg-blue-50) active:(bg-blue-100);
}

.menu-item-active {
    @apply bg-blue-100 text-blue-400;
}
</style>