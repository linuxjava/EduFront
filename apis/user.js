export function useLoginApi(body) {
    return useHttpPost('Login', '/login', {body})
}

export function useRegisterApi(body) {
    return useHttpPost('Reg', '/reg', {body})
}

export function useGetUserInfo() {
    return useHttpGet('GetUserInfo', '/getinfo')
}