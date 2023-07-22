/**
 * 检查是否登录和绑定手机号
 */
export default defineNuxtRouteMiddleware((to, from) => {
    //Calling `useRoute` within middleware may lead to misleading results. Instead, 
    //use the (to, from) arguments passed to the middleware to access the new and old routes
    //const route = useRoute()
    const token = useCookie('token')
    if(!token.value && to.name != 'login') {
        if(process.client) useMessage().error('请先登录')
        navigateTo('/login?from=' + from.fullPath)
        return
    }

    const user = useUser()
    if(!user.value?.phone && to.name != 'bindphone'){
        if(process.client) useMessage().error('请绑定手机号')
        navigateTo('/bindphone?from=' + from.fullPath)
        return
    }
})