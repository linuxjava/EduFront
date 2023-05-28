/**
 * 首页数据接口
 * @returns 
 */
export function useIndexDataApi(){
    return useHttpGet("IndexData", "/index",{
        lazy:true
    })
}

/**
 * 拼团数据接口
 * @param {*} query 
 * @returns 
 */
export function useGroupDataApi(query){
    let q = useQueryToString(query)
    return useHttpGet("groupData", `/group/list${q}`)
}

/**
 * 搜索接口
 * @param {*} query 
 * @returns 
 */
export function searchDataApi(query){
    return useHttpGet("searchData", () => {
        let q = useQueryToString(query())
        return `/search${q}`
    } ,{
        lazy:true
    })
}