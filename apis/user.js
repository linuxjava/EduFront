export function useLoginApi(body) {
    return useHttpPost('Login', '/login', {body})
}

export function useRegisterApi(body) {
    return useHttpPost('Reg', '/reg', {body})
}

export function useGetUserInfoApi() {
    return useHttpGet('GetUserInfo', '/getinfo')
}

export function useLogoutApi(){
    return useHttpPost('Logout', '/logout')
}