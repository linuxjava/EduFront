<template>
    <div class="bg-dark-400 text-gray-100 mt-auto">
        <div class="flex justify-center pt-7 pb-7">
            <a href="#" v-for="i in 5" :key="i" class="ml-2 mr-2">友情链接{{ i }}</a>
        </div>
        <div  class="flex justify-center py-5 border-t border-gray-700 edu-container">
            <small>
                Copyright © 2022 dishait.cn 粤ICP备2020100536号
            </small>
        </div>
    </div>
</template>