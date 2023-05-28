<template>
  <!--
    naive ui全局化配置：主题颜色、语言等
    inline-theme-disabled: 不再有 inline CSS 变量的按钮
   -->
  <n-config-provider inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </n-config-provider>
</template>
<script setup>



</script>
