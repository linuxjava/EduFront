import { createDiscreteApi } from "naive-ui";

// 将对象转url参数
export function useQueryToString(query = {}){
    let q = ""
    for (const key in query) {
        if(q == ""){
            q = `?${key}=${query[key]}`
        } else {
            q += `&${key}=${query[key]}`
        }
    }
    return q
}

// 回车事件
export function useEnterEvent(event){
    function handleEnterEvent(e){
        if (e.key === "Enter") {
            console.log('send')
            event()
            // 取消事件的默认动作
            e.preventDefault();
        }
    }
    
    onBeforeMount(()=>document.addEventListener("keydown",handleEnterEvent))
    onUnmounted(()=> document.removeEventListener("keydown",handleEnterEvent))
}

export function useMessage(){
    const { message } = createDiscreteApi(["message"])
    return message
}

export function useDialogWarning(content, positiveText = "退出", negativeText = "取消", onPositiveCallback){
    const { dialog } = createDiscreteApi(["dialog"])
    dialog.warning({
        content,
        positiveText,
        negativeText,
        onPositiveClick: onPositiveCallback,
    });
}