<template>
  <AppLayout class="min-w-screen min-h-screen">
    <NuxtPage />
  </AppLayout>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 中国大陆跨性别相关法律法规变迁` : '中国大陆跨性别相关法律法规变迁';
  }
})
</script>

