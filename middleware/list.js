const t = {
    course:"课程",
    column:"专栏",
    live:"直播",
    book:"电子书",
    group:"拼团",
    flashsale:"秒杀"
}

export default defineNuxtRouteMiddleware((to, from) => {
    const {type, page} = to.params
    let title = t[type]
    if(title && !isNaN(+page)) {
        useHead({title: title + '列表'})
        to.meta.title = title
        return
    }

    return abortNavigation('页面不存在')
})