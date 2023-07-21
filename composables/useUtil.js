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

//form校验
export function useFormValidate(formRef, success) {
    formRef.value.validate((errors) => {
        if(errors) return

        success()
    })
}

// 时间状态判断
export function useTimeStatus(start,end){
    start = (new Date(start)).getTime()
    end = (new Date(end)).getTime()
    const now = Date.now()

    let status = ""
    if(start < now && now < end){
        status = "ing"
    } else if(start >= now){
        status = "pending"
    } else {
        status = "end"
    }

    return status
}

/**
 * 将秒转为00:00:00
 * @param {} time 单位秒
 * @returns 
 */
export function useToHHmmss(time){
    // 秒 => 时分秒
    let s;
    let hours = parseInt((time % (60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((time % (60 * 60)) / 60);
    let seconds = time % 60;
    s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return s;
}