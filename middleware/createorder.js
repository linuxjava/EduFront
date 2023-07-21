const t = {
    course:"课程",
    column:"专栏",
    live:"直播",
    book:"电子书",
    group:"拼团",
    flashsale:"秒杀"
}

export default defineNuxtRouteMiddleware((to, from) => {
    const {id, type} = to.query
    const title = t[type]
    if(title && !isNaN(+id)) {
        useHead({title: '创建订单'})
        return true
    }

    return abortNavigation('页面不存在')
 })