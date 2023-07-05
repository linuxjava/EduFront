//文件上传配置信息
export function useUploadConfig() {
    const token = useCookie('token')
    return {
        action: fetchConfig.baseURL + '/upload',
        headers: {
            appid: fetchConfig.headers.appid,
            token: token.value
        }
    }
}