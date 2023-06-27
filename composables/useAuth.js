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