import {
    createDiscreteApi,
  } from 'naive-ui'

export default defineNuxtPlugin(nuxtApp => {
    const loading = ref(null)
    nuxtApp.hook('app:mounted', (e) => {
        if(!loading.value) {
            const { loadingBar } = createDiscreteApi(["loadingBar"])
            loading.value = loadingBar
        }
    })
    nuxtApp.hook('page:start', (e) => {
        loading.value?.start()
    })
    nuxtApp.hook('page:finish', (e) => {
        setTimeout(() => {
            loading.value?.finish()
        }, 200)
    })
    nuxtApp.hook('app:error', (e) => {
        if(process.client) {
            setTimeout(() => {
                loading.value?.finish()
            }, 200)
        }
    })
})