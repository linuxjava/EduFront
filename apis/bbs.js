//社区列表
//mobile/bbs?page=1
export function useBbsListApi() {
    return useHttpGet('bbsList', `/bbs?page=1`)
}

//帖子列表
export function usePostList(query){
    return useHttpGet("postList",()=>{
        let q = useQueryToString(query())
        return `/post/list${q}`
    },{
        lazy:true
    })
}