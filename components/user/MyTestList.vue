<template>
<div>
    <UiCard>
        <UiCardHeader class="flex text-xs text-gray-600 px-4">
            <span class="">
                {{ item.testpaper.title }}
            </span>

            <span class="ml-auto" :class="item.answer_status ? 'text-green-600' : 'text-rose-600'">
                {{ item.answer_status ? '考试完成' : '考试中' }}
            </span>
        </UiCardHeader>
        <UiCardBody class="flex mt-2 bg-white py-2  px-4 text-gray-600">
            <small class="mr-3">题目总数：{{ item.testpaper.question_count }}</small>
            <small class="mr-3">总分数：{{ item.testpaper.total_score }}</small>
            <small class="mr-3">及格分：{{ item.testpaper.pass_score }}</small>
        </UiCardBody>

        <UiCardFooter class="flex mt-2 text-gray-400 px-4 items-center">
            <span>{{ item.created_time }}</span>
            <span class="ml-auto">
                最终得分：
                <span :class="item.read_status ? 'text-green-600' : 'text-rose-600'">
                    {{ item.read_status ? item.score : '正在阅卷' }}
                </span>
            </span>
        </UiCardFooter>
    </UiCard>
    
</div>
</template>
<script setup>
const props = defineProps({
    item: Object
})
</script>
<style>
</style>