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

//查看帖子
export function usePostRead(id){
    return useHttpGet('postRead', `/post/read?id=${id}`)
}

//评论帖子
export function usePostReply(body){
    return useHttpPost('postReply', 'post/reply', {body})
}

//查看帖子评论列表
export function usePostCommentList(query){
    return useHttpGet("postCommentList",()=>{
        let q = useQueryToString(query())
        return `post_comment${q}`
    },{
        lazy:true
    })
}

//发帖
export function usePostSave(body) {
    return useHttpPost('postSave', '/post/save', {body})
}