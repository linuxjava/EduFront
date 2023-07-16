//获取章节内容
export function useChapaterContent(query) {
    let q = useQueryToString(query)
    return useHttpGet("bookChapaterDetail", `/book/detail${q}`)
}