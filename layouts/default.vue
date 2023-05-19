<template>
  <div class="body">
    <Navbar></Navbar>
    <main class="edu-container">
      <slot />
    </main>
    <PageFooter></PageFooter>
  </div>
</template>

<style>
.body {
  min-width: 1000px;
  /* min-h-screen占满整个屏幕高度 */
  @apply bg-gray-100 flex flex-col min-h-screen
}
</style>