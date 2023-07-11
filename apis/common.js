/**
 * 通用列表
 * @param {*} type course/book/column/live/flashsale
 * @param {*} query 
 * @returns 
 */
export function useCommonListApi(type, query) {
    return useHttpGet(`${type}List`, ()=>{
        let q = useQueryToString(query())
        return `/${type}/list${q}`
    }, {
        lazy: true
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