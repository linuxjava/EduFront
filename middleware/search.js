export default defineNuxtRouteMiddleware((to, from) => {
    if(!to.query.keyword) {
        return abortNavigation("搜索关键词不能为空")
    }

    const {type, page} = to.params
    //isNaN函数用于检查其参数是否是非数字值
    //加号就是把变量转换成 number 类型
    if(!['course', 'column'].includes(type) || isNaN(+page)) {
        return abortNavigation("页面不存在")
    }
})