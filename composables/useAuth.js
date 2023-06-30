//获取state中存储的user，如果没有则返回一个响应式对象，但对象的value为下面返回的默认值null
export const useUser = () => useState("user", () => null)

//获取用户信息
export async function useRefreshUserInfo() {
    const token = useCookie('token')
    const user = useUser()
    if (!token.value) {
        navigateTo('/login')
        return
    }

    const { data, error } = await useGetUserInfoApi()
    if (error.value) {
        return
    }

    user.value = data.value
}

// 退出登录
export async function useLogout(){
    await useLogoutApi()
    const token =  useCookie('token')
    token.value = null
    const user =  useUser()
    user.value = null

    useMessage().success('退出登录成功')

    // 回到首页
    const route = useRoute()
    if(route.path != "/"){
        navigateTo('/', {replace: true})
    }
}

// 检查用户是否已具备权限(登录并且绑定手机号之后才能操作)
export function useHasAuth(callback = null) {
    const route = useRoute()
    const token = useCookie('token')
    if(!token.value) {
        useMessage().error('请先登录')
        return navigateTo('/login?from=' + route.fullPath)
    }

    const user = useUser()
    if(!user && !user.value?.phone){
        useMessage().error('请绑定手机号')
        return navigateTo('/bindphone?from=' + route.fullPath)
    }

    if(callback && typeof callback === "function"){
        callback()
    }
}