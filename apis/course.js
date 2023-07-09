//课程列表
export function useCourseListApi(query) {
    return useHttpGet('courseList', ()=>{
        let q = useQueryToString(query())
        return `/course/list${q}`
    }, {
        lazy: true
    })
}

//课程详情页
export function useCourseDetailApi(query) {
    let q = useQueryToString(query)
    return useHttpGet("readCourse",`/course/read${q}`,{
        lazy:true
    })
}

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