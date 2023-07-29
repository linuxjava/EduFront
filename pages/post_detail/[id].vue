<template>
    <div>
        <n-breadcrumb>
            <n-breadcrumb-item>
                <NuxtLink to="/">首页</NuxtLink>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
                <NuxtLink to="/bbs/0/1">社区列表</NuxtLink>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
                {{ title }}
            </n-breadcrumb-item>
        </n-breadcrumb>

        <div>
            <n-grid :x-gap="20" class="mt-4 mb-8">
                <n-grid-item :span="18" class="bg-white rounded">
                    <LoadingGroup :pending="pending" :error="error">
                        <div class="flex border-b px-6 py-4">
                            <n-image
                                :src="data.user.avatar || 'http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/8244b41708e6d86b9ec1.jpg'"
                                class="w-[60px] object-cover" />
                            <div class="flex flex-col ml-2 justify-between">
                                <span>{{ data.user.name }}</span>
                                <span class="text-gray-400">发布时间{{ data.created_time }}</span>
                            </div>
                        </div>

                        <div v-for="(item, index) in data.content" :key="index" class="px-6 py-4">
                            <p class="mb-3">{{ item.text }}</p>
                            <n-image-group>
                                <n-space>
                                    <n-image v-for="(img, inx) in item.images" :key="inx" :src="img"
                                        class="rounded shadow object-cover" />
                                </n-space>
                            </n-image-group>
                        </div>

                        <div class="flex justify-center">
                            <n-button icon-placement="left" secondary strong size="tiny" class="mr-3"
                                :type="data.issupport ? 'primary' : 'tertiary'" @click.stop="handleSupport(data)"
                                :loading="supportLoading">
                                <template #icon>
                                    <n-icon>
                                        <ThumbsUpSharp />
                                    </n-icon>
                                </template>
                                点赞{{ data.support_count || '' }}
                            </n-button>
                        </div>
                    </LoadingGroup>

                    <div class="px-6">
                        <n-divider  />

                        <CommentInput class="mt-10 mb-15" @success="handleCommentSuccess" :post_id="id" :show-cancel="false"></CommentInput>

                        <n-divider />

                        <Comment ref="CommentRef" class="text-sm" :post_id="id"></Comment>
                    </div>

                </n-grid-item>

                <n-grid-item :span="6">
                    <NuxtLink to="">
                        <n-button type="primary" size="medium" @click="addPost" class="w-[100%] mb-4">发布帖子</n-button>
                    </NuxtLink>

                    <div class="bg-white rounded  pb-6">
                        <div class="border-b h-[45px] flex items-center pl-3">
                            精品推荐
                        </div>
                        <HotList></HotList>
                    </div>
                </n-grid-item>
            </n-grid>
        </div>
    </div>
</template>
<script setup>
import { NBreadcrumb, NBreadcrumbItem, NGrid, NGridItem, NButton, NImage, NImageGroup, NIcon, NDivider } from 'naive-ui'
import {
    ThumbsUpSharp,
} from '@vicons/ionicons5'

definePageMeta({
    middleware(to, from){
        if(!isNaN(+to.params.id)){
            return true
        }

        return abortNavigation('页面不存在')
    }
})

const route = useRoute()
const id = route.params.id

const { data, error } = await usePostRead(id)

const title = computed(() => {
    return data.value && data.value.desc && data.value.desc.text ? data.value.desc.text.slice(0, 10) + '...' : '帖子详情'
})

useHead({ title })

//点赞
const { supportLoading, handleSupport } = useHandleSupportPost()

/**
 * 评论成功
 */
const CommentRef = ref(null)
function handleCommentSuccess(){
    CommentRef.value.handlePageChange(1)
}

/**
 * 发帖
 */
function addPost() {
    navigateTo('/post/add')
}
</script>
<style></style>'