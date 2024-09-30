<script setup lang="ts">
const { cover } = useAppConfig()
</script>

<template>
  <div class="sm:pt-6 sm:pb-10 pb-5">
    <Html lang="zh-Hans-CN" />
    <!-- <Meta property="og:image" :content="cover"/> -->
    <Link rel="shortcut icon" href="/china-legal/favicon.ico"/>
    <Meta name="twitter:card" content="summary_large_image" />
    <NuxtLoadingIndicator />
    <AppNavbar />
    <slot />
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-gray-50 text-black dark:bg-gray-900 dark:text-white;
}
</style>
