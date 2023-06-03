export async function usePage(initListApiCallback) {
    const route = useRoute()
    const page = ref(route.params.page)
    const pageSize = ref(1)//默认值
    //处理直接在搜索栏修改pageSize
    if (route.query.pageSize && route.query.pageSize > 0) {
        pageSize.value = route.query.pageSize
    }

    const { data, pending, error, refresh } = await initListApiCallback({
        page,
        pageSize
    })

    //1.这里服务端渲染时data.value会为空，所以要判断是否为空否则服务端渲染报错
    //2.注意这里获取rows要使用计算属性，因为rows有可能改变
    const rows = computed(()=>data.value?.rows ?? [])
    //count同rows一样
    const total = computed(()=>data.value?.count ?? 0)

    const handlePageChange = (page) => {
        navigateTo({
            params: {
                ...route.params,
                page
            },
            query: {
                ...route.query
            }
        })
    }

    return {
        data, pending, error, refresh,
        page, pageSize, rows, total, handlePageChange
    }
}