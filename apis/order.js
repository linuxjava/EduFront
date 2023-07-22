//下单前获取产品信息
export function useGetGoodsInfoApi(query){
    let q = useQueryToString(query)
    return useHttpGet("getGoodsInfo", `/goods/read${q}`)
}

//获取可用优惠券列表
///user_coupon?goods_id=6&type=course&page=1
export function useGetUserCouponApi(query){
    let q = useQueryToString(query)
    return useHttpGet("getUserCoupon", `/user_coupon${q}`)
}

//创建订单
export function useCreateOrder(body){
    return useHttpPost("createOrder", '/order/save', {body})
}

//微信PC支付
export function useWxPcPayApi(body){
    return useHttpPost('wxPcPay', 'order/wxpay', {body})
}

//查询订单是否支付成功
export function useIsPaySuccApi(body) {
    return useHttpPost('isPaySucc', '/order/iswxpay', {body})
}