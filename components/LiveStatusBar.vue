<template>
    <div>
        <n-alert :show-icon="false" :type="status == 'ing' ? 'success' : 'default'">
            <span v-if="status === 'end'" class="text-gray-400">直播已结束</span>
            <span v-else>{{ start }} ~ {{ end }}</span>
        </n-alert>
    </div>
</template>
<script setup>
import { NAlert } from 'naive-ui'

const props = defineProps(["start","end"])

const status = computed(() => useTimeStatus(props.start, props.end))
</script>
<style></style>