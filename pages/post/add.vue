<template>
    <div class="flex flex-col items-center">
        <ClientOnly>
            <div class="w-[600px]">
                <!-- 
                show-label要加上，减少上下padding
                -->
                <n-form ref="formRef" :model="form" :rules="rules" :show-label="false" size="large">

                    <n-form-item path="bbs_id">
                        <n-select v-model:value="form.bbs_id" :options="options" placeholder="请选择主题" value-field="id"
                            label-field="title" class="bg-white" />
                    </n-form-item>

                    <div class="bg-white p-3 shadow mb-3" v-for="(item, index) in form.content" :key="index">
                        <div v-if="index > 0" class="flex justify-end mb-2">
                            <n-button size="tiny" @click="removeBlock(index)">
                                <n-icon>
                                    <Close />
                                </n-icon>
                            </n-button>
                        </div>

                        <n-form-item>
                            <n-input placeholder="说点什么吧~" type="textarea" clearable size="medium" :autosize="{
                                minRows: 5,
                                maxRows: 10
                            }" v-model:value="item.text" />
                        </n-form-item>
                        <n-form-item>
                            <div class="w-full flex">
                                <uploader v-model="item.images" :max="9"></uploader>
                            </div>
                        </n-form-item>
                    </div>

                    <n-form-item>
                        <div class="mt-2 w-full">
                            <n-button type="info" dashed class="w-full" @click="add">
                                添加区块
                            </n-button>
                        </div>
                    </n-form-item>

                    <n-form-item>
                        <div class="w-full flex">
                            <n-button type="primary" class="ml-auto" @click="publish" :loading="loading">
                                发布
                            </n-button>
                        </div>
                    </n-form-item>
                </n-form>
            </div>
        </ClientOnly>
    </div>
</template>
<script setup>
import { NSelect, NInput, NButton, NForm, NFormItem, NIcon } from 'naive-ui';
import {
    Close
} from "@vicons/ionicons5"

definePageMeta({
    middleware: ['auth']
})

const formRef = ref(null)
const rules = {
    // select校验不能添加trigger,否则校验失败
    bbs_id: [{
        required: true,
        message: "请选择社区",
        // trigger: ['blur', 'change']
    }]
}
const form = ref({
    bbs_id: null,
    content: [
        {
            text: "",
            images: []
        }
    ]
})
const loading = ref(false)

const { data, error } = await useBbsListApi();

const options = computed(() => {
    return data.value ? data.value.rows : []
})

//添加区块
function add() {
    form.value.content.push({
        text: "",
        images: []
    })
}

//删除区块
function removeBlock(index) {
    useDialogWarning('确定删除吗？', '确定', '取消', () => {
        form.value.content.splice(index, 1)
        useMessage().success('删除成功')
    })
}

//发布
function publish() {
    useFormValidate(formRef, async () => {
        if (form.value.content.filter(o => o.text.trim() == '').length > 0) {
            return useMessage().warning("请检查帖子内容是否为空")
        }

        loading.value = true
        const { data, error } = await usePostSave(form)
        loading.value = false
        if (error.value) return

        useMessage().success('发帖成功')
        navigateTo('/bbs/0/1')
    })
}
</script>
<style></style>