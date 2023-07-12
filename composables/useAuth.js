//获取state中存储的user，如果没有则返回一个响应式对象，但对象的value为下面返回的默认值null
export const useUser = () => useState("user", () => null)

//获取用户信息
export async function useRefreshUserInfo() {
    const token = useCookie('token')
    const user = useUser()
    // 用户已登录，直接获取用户信息
    if(token.value){
        let {
            data,
            error
        } = await useGetUserInfoApi()
        if(data.value){
            //如果将useUser调用放在下面这个地址，就会报如下错误,下面链接文档中有一些说明：
            //A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt 
            // middleware, or Vue setup function. This is probably not a Nuxt bug. Find out more at 
            //`https://nuxt.com/docs/guide/concepts/auto-imports#using-vue-and-nuxt-composables`
            // 大概意思是，在调用a composable方法前不能use await,以下场景除外：
            // 1.within <script setup> blocks, 
            // 2.within the setup function of a component declared with defineNuxtComponent
            // 3.in defineNuxtPlugin 
            // 4.in defineNuxtRouteMiddleware
            // 原因：
            // 1.因为useUser是在useRefreshUserInfo(是一个composable)中调用的且是在await后，所以不满足上面的条件
            // 2.将这个方法整个代码拷贝到中间件中运行就没问题
            // const user = useUser()
            user.value = data.value
        }
    }
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

//点赞和取消点赞通用方法
export function useHandleSupportPost(){
    const supportLoading = ref(false)
    const handleSupport = (item) => {
        useHasAuth(async () => {
            // 行为判断
            let type = item.issupport ? 'unsupport' : 'support'
            let msg = item.issupport ? '取消点赞' : '点赞'

            supportLoading.value = true
            const {error} = item.issupport ? await useUnSupportPostApi({post_id: item.id}) : await useSupportPostApi({post_id: item.id})
            supportLoading.value = false

            if(error.value) {
                return
            }

            if(item.issupport) {
                item.support_count -= 1
            } else {
                item.support_count += 1
            }

            item.issupport = !item.issupport

            useMessage().success(msg + '成功')
        })
    }

    return {supportLoading, handleSupport}
}