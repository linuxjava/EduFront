//课程列表
export function useCourseListApi(query) {
    return useHttpGet('courseList', ()=>{
        let q = useQueryToString(query())
        return `/course/list${q}`
    }, {
        lazy: true
    })
}