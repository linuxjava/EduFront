export const useUser = () => useState("user", () => null)

export async function useRefreshUserInfo() {
    const token = useCookie('token')
    const user = useUser()
    if (!token.value) {
        navigateTo('/login')
        return
    }

    const { data, error } = await useGetUserInfo()
    if (error.value) {
        return
    }

    user.value = data.value
}