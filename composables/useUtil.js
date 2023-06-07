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