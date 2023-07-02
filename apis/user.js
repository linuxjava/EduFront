export function useLoginApi(body) {
    return useHttpPost('Login', '/login', {body})
}

export function useRegisterApi(body) {
    return useHttpPost('Reg', '/reg', {body})
}

export function useGetUserInfoApi() {
    return useHttpGet('GetUserInfo', '/getinfo')
}

export function useLogoutApi(){
    return useHttpPost('Logout', '/logout')
}

export function useGetCaptcha(body) {
    return useHttpPost('GetCaptcha', '/get_captcha', {body})
}

export function useBindPhone(body){
    return useHttpPost('BindPhone', '/bind_mobile', {body})
}

export function useForget(body){
    return useHttpPost('Forget', '/forget', {body})
}

// 获取学习记录
export function useUserHistoryApi(query){
    return useHttpGet("userHistory",()=>{
        let q = useQueryToString(query())
        return `/user_history/list${q}`
    },{
        lazy:true
    })
}

// 购买记录
export function useOrderListApi(query){
    return useHttpGet("orderList",()=>{
        let q = useQueryToString(query())
        return `/order/list${q}`
    },{
        lazy:true
    })
}

//我的考试
export function useMyTestApi(query){
    return useHttpGet('myTest', ()=>{
        let q = useQueryToString(query())
        return `/user_test/list${q}`
    }, {
        lazy: true
    })
}

//我的帖子
export function useMyPostApi(query) {
    return useHttpGet('myPost', ()=>{
        let q = useQueryToString(query())
        return `/mypost${q}`
    }, {
        lazy: true
    })
}

//点赞
export function useSupportPostApi(body) {
    return useHttpPost('supportPost', '/post/support', {body})
}

//取消点赞
export function useUnSupportPostApi(body) {
    return useHttpPost('unSupportPost', '/post/unsupport', {body})
}

//删除帖子
export function useDeletePostApi(body) {
    return useHttpPost('unSupportPost', '/post/delete', {body})
}

//优惠卷记录
export function useMyCouponApi(query) {
    return useHttpGet('myCoupon', ()=>{
        let q = useQueryToString(query())
        return `/user_coupon${q}`
    }, {
        lazy: true
    })
}