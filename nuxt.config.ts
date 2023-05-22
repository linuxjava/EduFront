// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    app:{
        //全局head配置
        head:{
            titleTemplate:"%s - yyds编程",
            title:"yyds编程",
            charset: "utf-8",
            htmlAttrs:{
                lang:"zh-cn"
            },
            meta:[
                { name:"description",content:"yyds编程描述" },
                { name:"keywords",content:"yyds编程关键词" },
            ],
            //自定义全局脚本
            script:[
                // { src:"http://xxx.js" }
            ],
            //自定义全局样式
            link:[
                // { rel:"stylesheet",href:"http://xxx.css" }
            ]
        }
    },
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    'naive-ui',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer'
                ]
                : ['@juggle/resize-observer']
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                    : []
        }
    },
    modules: [
        'nuxt-windicss',
    ],
    css:[
        "@/assets/main.css"
    ],
})
