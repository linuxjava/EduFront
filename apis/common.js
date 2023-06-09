/**
 * 通用列表
 * @param {*} type course/book/column/live/flashsale
 * @param {*} query 
 * @returns 
 */
export function useCommonListApi(type, query) {
    let q = useQueryToString(query)
    return useHttpGet(`${type}List`,`/${type}/list${q}`,{
        lazy:true
    })
}

/**
 * 通用列表详情
 * @param {*} type course/book/column/live/flashsale
 * @param {*} query 
 * @returns 
 */
export function useCommonDetailApi(type, query) {
    let q = useQueryToString(query)
    return useHttpGet(`read${type}`,`/${type}/read${q}`,{
        lazy:true
    })
}

// 获取可用优惠券列表
export function useCouponListApi(){
    return useHttpGet("CouponList","/coupon/list")
}