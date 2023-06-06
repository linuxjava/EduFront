export default defineNuxtRouteMiddleware((to, from) => {
    useRefreshUserInfo()
})