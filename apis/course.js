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

//领取优惠卷
export function useCouponReceive(body) {
    return useHttpPost('couponReceive', 'user_coupon/receive', {body})
}