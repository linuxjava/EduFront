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

export function useGetCaptcha(body) {
    return useHttpPost('GetCaptcha', '/get_captcha', {body})
}

export function useBindPhone(body){
    return useHttpPost('BindPhone', '/bind_mobile', {body})
}