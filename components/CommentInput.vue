<template>
    <div>
        <ClientOnly>
            <n-form :model="form" ref="formRef" :rules="rules" :inline="false" size="normal">
                <n-form-item path="content">
                    <n-input placeholder="说点什么吧~" type="textarea" clearable size="medium" :autosize="{
                        minRows: 5,
                        maxRows: 10
                    }" v-model:value="form.content" />
                </n-form-item>
                <n-form-item class="mt-2">
                    <div class="w-full flex justify-end">
                        <n-button type="primary" :disabled="!form.content" size="medium" @click="onApply">回复</n-button>
                        <n-button strong secondary type="tertiary" size="medium" @click="emit('cancel')"
                            class="ml-2">取消</n-button>
                    </div>
                </n-form-item>
            </n-form>
        </ClientOnly>
    </div>
</template>
<script setup>
import { NInput, NButton, NForm, NFormItem } from 'naive-ui'

const props = defineProps({
    post_id:[String,Number],
    showCancel: {
        type: Boolean,
        default: false,
    },
    reply_id: {
        type: [String, Number],
        default: 0
    },
    reply_user: Object
})

const emit = defineEmits(["success", "cancel"])

const rules = ref([
    {
        content: [
            {
                required: true,
                message: '说点什么吧',
                trigger: ['blur']
            }
        ]
    }
])
const form = ref({
    content: "",
})


async function onApply() {
    // useHasAuth(() => {

    // })
    let body = {
        post_id: parseInt(props.post_id),
        content: form.value.content
    }
    if (props.reply_id != 0) {
        body.reply_id = props.reply_id
        body.reply_user = {
            id: props.reply_user.id,
            username: props.reply_user.name,
            avatar: props.reply_user.avatar,
        }
    }

    const { data, error } = await usePostReply(body)

    if (error.value) return

    //这种情况是直接
    if (props.showCancel) emit("cancel")

    form.value.content = ''
    useMessage().success('评论成功')
    emit('success', data.value)
}
</script>
<style></style>