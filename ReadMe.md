# defineExpose问题

当想在自定义组件中向外暴露方法时，如果组件加载时就有await网络请求，需要将defineExpose定义写在wait网络请求前面，否则调用的时候会找不到handlePageChange

```js
const handlePageChange = (p) => {
    page.value = p
    refresh()
}

defineExpose({
    handlePageChange
})

let { data, pending, error, refresh, rows, total } = await usePage(() => {
        return usePostCommentList(() => {
            return {
                page: page.value,
                limit: pageSize.value,
                post_id: props.post_id
            }
        })
}, 10)
```

错误信息如下：

```js
[id].vue:116 Uncaught (in promise) TypeError: CommentRef.value.handlePageChange is not a function
    at handleCommentSuccess ([id].vue:116:22)
    at callWithErrorHandling (chunk-FHPNLUPZ.js:213:18)
    at callWithAsyncErrorHandling (chunk-FHPNLUPZ.js:221:17)
    at emit (chunk-FHPNLUPZ.js:722:5)
    at chunk-FHPNLUPZ.js:7465:45
    at CommentInput.vue:85:9
```



# Naive-ui中n-select问题

在form表单中对n-select校验时

```html
<n-form ref="formRef" :model="form" :rules="rules" :show-label="false">

	<n-form-item path="bbs_id">
		<n-select v-model:value="form.bbs_id" :options="options" placeholder="请选择主题" class="bg-white" />
	</n-form-item>
</n-form>
```
规则中不能添加trigger，否则校验一直会失败
```js
const rules = {
    // select校验不能添加trigger,否则校验失败
    bbs_id: [{
        required: true,
        message: "请选择社区",
        // trigger: ['blur', 'change']
    }]
}
```

# Naive-ui中n-form问题

当form表单中不需要lable的时候，需要显示的设置show-label为false，这样可以减少n-form-item之间的间距

```js
<n-form :show-label="false">
  <n-form-item>
  </n-form-item>
</n-form>
```



# 组件中网路请求

n-form表单中的input组件在提交使用网络请求是要使用$fetch，不能使用useFetch，如果使用useFetch当请求是否后，在input中输入任何内容，会莫名其妙的自动触发网络请求，很奇怪。