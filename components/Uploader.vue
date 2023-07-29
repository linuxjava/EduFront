<template>
    <div style="width: 100%;">
        <ClientOnly>
            <template #fallback>
                <!-- 加载中 -->
                <div class="border rounded bg-gray-50 flex items-center justify-center"
                style="width:94px;height:94px;">
                    <n-spin show />
                </div>
            </template>
            <n-upload :action="action" v-model:file-list="fileList" list-type="image-card" :headers="headers"
                :max="max" accept="image/png, image/jpeg, image/gif" :on-error="handleError" name="file"
                :on-finish="handleSuccess" :data="data"/>
        </ClientOnly>
    </div>
</template>
<script setup>
import { NUpload, NSpin } from 'naive-ui'

const props = defineProps({
    modelValue: String,
    data:{
        type: Object
    },
    max: {
        type: Number,
        default: 1
    },
})

//获取上传文件配置信息
const { action, headers } = useUploadConfig()

//初始化fileList,组件外部绑定默认值
let fileList = ref([])
initFileList()
function initFileList() {
    if(typeof props.modelValue == "string"){
        fileList.value = props.modelValue ? [{
            id: props.modelValue,
            name: props.modelValue,
            status: 'finished',
            url: props.modelValue
        }] : []
    } else {
        fileList.value = props.modelValue.map(url=>{
            return {
                id: url,
                name: url,
                status: 'finished',
                url: url
            }
        })
    }
}

// 上传成功
const handleSuccess = (...e) => {
    const { file, event } = e[0]
    //需要从response中解析得到文件存储的url，然后保存到file.url中
    const response = JSON.parse(event.target.response)
    file.url = response.data
    return file
}

// 上传失败
const handleError = (e) => {
    useMessage().error("上传失败")
}


// 监听fileList变化，当有变化后需要更新到组件外部
const stopWatch = watch(() => fileList, (newVal) => {
    updateModelValue()
}, {
    deep: true//深度监听
})

onBeforeUnmount(() => stopWatch())

const emit = defineEmits(["update:modelValue"])
function updateModelValue() {
    //注意当上传一个文件时，这里监听fileList时会有多次调用，因为文件上传会有pedding、uploading、finished状态
    //所以下面的需要检查status
    let urls = []
    fileList.value.forEach(o => {
        if (o.status === "finished" && o.url) {
            urls.push(o.url)
        }
    })
    
    emit("update:modelValue", props.max == 1 ? (urls[0] || "") : urls)
}
</script>

