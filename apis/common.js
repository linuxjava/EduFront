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

    //下面错误的写法会报如下错误：A composable that requires access to the Nuxt instance was called 
    // outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function
    // return useHttpGet(`${type}List`, ()=>{
    //     let q = useQueryToString(query())
    //     return `/${type}/list${q}`
    // }, {
    //     lazy: true
    // })
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