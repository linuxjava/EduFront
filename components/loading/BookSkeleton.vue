
<template>
    <div>
        <n-grid :x-gap="20" :cols="2">
            <n-grid-item v-for="i in 8" :key="i">
                <n-card class="mb-5" content-style="padding: 0;" footer-style="padding: 0;">
                    <div class="flex p-3">
                        <n-skeleton class="rounded w-[108px] h-[138px]"  />
                        <div class="flex flex-col flex-grow ml-3">
                            <n-skeleton text style="width: 60%" size="medium"/>
                            <div class="mt-auto flex items-center">
                                <div class="flex items-end">
                                    <n-skeleton width="30px" text /> 
                                    <n-skeleton width="30px" class="ml-2" /> 
                                </div>
                                <n-skeleton width="100px" round size="medium" class="ml-auto"/> 
                            </div>
                        </div>
                    </div>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>
<script setup>
import { NGrid, NGridItem, NCard, NSkeleton } from 'naive-ui'
</script>
<style scoped></style>