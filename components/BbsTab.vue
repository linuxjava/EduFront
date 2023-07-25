<template>
    <div>
        <UiTab>
            <UiTabItem v-for="(item, index) in tabs" :key="index" :active="bbs_id === item.id"
                @click="clickTab(item)">
                {{ item.title }}</UiTabItem>
        </UiTab>
    </div>
</template>
<script setup>
const route = useRoute()
const bbs_id = ref(route.params.bbs_id | 0)

const { data, error } = await useBbsListApi();

const tabs = computed(() => {
    return [
        {
            'id': 0,
            'title': "全部"
        },
        ...data.value?.rows
    ]
})


function clickTab(item){
    bbs_id.value = item.id
    navigateTo({
        params: {
            ...route.params,
            bbs_id: item.id,
            page: 1
        },
        query: {
            ...route.query
        }
    })
}
</script>
<style></style>