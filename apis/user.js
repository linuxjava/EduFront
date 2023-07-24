export function useLoginApi(body) {
    return useHttpPostByFetch('Login', '/login', {body})
}

export function useRegisterApi(body) {
    return useHttpPostByFetch('Reg', '/reg', {body})
}

export function useGetUserInfoApi() {
    return useHttpGetByFetch('GetUserInfo', '/getinfo',{
        $:true
    })
}

export function useLogoutApi(){
    return useHttpPost('Logout', '/logout')
}

//获取手机验证码
export function useGetCaptcha(body) {
    return useHttpPost('GetCaptcha', '/get_captcha', {body})
}

//绑定手机号
export function useBindPhone(body){
    return useHttpPostByFetch('BindPhone', '/bind_mobile', {body})
}

//忘记密码
export function useForget(body){
    return useHttpPostByFetch('Forget', '/forget', {body})
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

//我的收藏
export function useMyFaveApi(query) {
    return useHttpGet('myFava', ()=>{
        let q = useQueryToString(query())
        return `/user_fava${q}`
    }, {
        lazy: true
    })
}

//取消收藏
export function useUncollectApi(body) {
    return useHttpPost('uncollect', '/uncollect', {body})
}

//收藏
export function useCollectApi(body) {
    return useHttpPost('collect', '/collect', {body})
}

//修改资料
export function useUpdateInfoApi(body) {
    return useHttpPostByFetch('updateInfo', '/update_info', {body})
}

//修改密码
export function useUpdatePasswordAPi(body) {
    return useHttpPostByFetch('updatePasswor', '/update_password', {body})
}