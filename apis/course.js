//推荐列表
export function useHotApi(){
    return useHttpGet('hot', '/hot')
}

// 免费学习
export function useLearnApi(body){
    return useHttpPost("learn","/order/learn",{
        body
    })
}