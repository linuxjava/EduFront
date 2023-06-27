/**
 * 检查是否登录和绑定手机号
 */
defineNuxtRouteMiddleware((to, form) => {
    const route = useRoute()
    const token = useCookie('token')
    if(!token.value && route.name != 'login') {
        if(process.client) useMessage().error('请先登录')
        navigateTo('/login?from=' + route.fullPath)
        return
    }

    const user = useUser()
    if(!user.value?.phone && route.name != 'bindphone'){
        if(process.client) useMessage().error('请绑定手机号')
        navigateTo('/bindphone?from=' + route.fullPath)
        return
    }
})