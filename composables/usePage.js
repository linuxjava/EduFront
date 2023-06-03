export async function usePage(initListApiCallback) {
    const route = useRoute()
    const page = ref(parseInt(route.params.page))
    const pageSize = ref(12)//默认值
    //处理直接在搜索栏修改pageSize
    if (route.query.pageSize && route.query.pageSize > 0) {
        pageSize.value = route.query.pageSize
    }

    const { data, pending, error, refresh } = await initListApiCallback({
        page: page.value,
        //注意：这里的pageSize传递的是响应式对象，否则切换时会有问题
        pageSize: pageSize
    })

    //1.这里服务端渲染时data.value会为空，所以要判断是否为空否则服务端渲染报错
    //2.注意这里获取rows要使用计算属性，因为rows有可能改变
    const rows = computed(() => data.value?.rows ?? [])
    //count同rows一样
    const total = computed(() => data.value?.count ?? 0)


    //注意page和pageSize发生变化时的区别
    //1.page变化时，调用navigateTo会导致url地址发生变化，因此页面会重新初始化并加载
    //2.pageSize变化时
    //  2.1改变pageSize厚直接调用refresh刷新, 缺点是当切换pageSize没法将page设置为第一页
    //  2.2 为了解决2.1问题，可以将pageSize放到query中，然后监听
    const handlePageChange = (page) => {
        navigateTo({
            params: {
                ...route.params,
                page: page
            },
            query: {
                ...route.query
            }
        })
    }

    //分页size变化监听
    // const pageSizeWatch = watch(() => route.query.pageSize, (newVal) => {
    //     console.log("pageSize.value3=" + pageSize.value)
    //     refresh()
    // })

    // onBeforeUnmount(() => {
    //     console.log('onBeforeUnmount')
    //     pageSizeWatch()
    // })

    const handlePageSizeChange = (ps) => {
        if(page.value === 1) {
            //因为pageSize传递给initListApiCallback是响应式对象，所以修改时会触发refresh
            pageSize.value = ps
            //更新地址栏中pageSize参数
            navigateTo({
                params: {
                    ...route.params
                },
                query: {
                    ...route.query,
                    pageSize: ps
                }
            })
        }else{
            //因为page变化导致url更新，页面会被重新渲染
            navigateTo({
                params: {
                    ...route.params,
                    page: 1
                },
                query: {
                    ...route.query,
                    pageSize: ps
                }
            })
        }

        // pageSize.value = ps
        //当page!=1切换pageSize时，因url发生改变会触发第2次请求，因此在page!=1切换pageSize时总共触发2次请求
        // navigateTo({
        //     params: {
        //         ...route.params,
        //         page: 1
        //     },
        //     query: {
        //         ...route.query,
        //         pageSize: pageSize.value
        //     }
        // })
    }

    return {
        data, pending, error, refresh,
        page, pageSize, rows, total, handlePageChange, handlePageSizeChange
    }
}