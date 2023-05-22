export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('commonOpen', (item) => {
        if(item.type === 'webview') {
            window.open(item.url)
        } else if(item.type == "course"){
            navigateTo(`/detail/course/${item.course_id}`)
        }
    })
})

//这种方式也可以
// export default defineNuxtPlugin(() => {
//     return {
//       provide: {
//         commonOpen: (item) => {
//             if(item.type === 'webview') {
//                 window.open(item.url)
//             }
//         }
//       }
//     }
//   })