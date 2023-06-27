/**
 * 已登录时限制访问某些页面（登录、忘记密码）
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    if(token.value) {
        if(process.client) {
            if(from.name === 'forget') {
                useMessage().error("请先退出登录")
            }else{
                useMessage().error("已登录，请勿重复登录")
            }
        }

        return '/'
    }
})