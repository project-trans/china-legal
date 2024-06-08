<template>
  <div class="max-w-4xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg">
    <main class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
      <slot />
    </main>
  </div>
  <WorkLicenseInfo v-if="page.external?.copyright===true" class="mt-10 text-center w-full"/>
  <div class="text-center w-full">由 <img src="/img/project-trans-inline.svg" class="inline h-4" alt="PROJECT TRANS"> 提供。</div>
</template>
<script lang="ts" setup>
const { page } = useContent()
//v-if="page.value?.external?.copyright===true"
// import markdown from '../modules/nuxt-content-transformers/markdown'
// import {transformContent} from "@nuxt/content/transformers/index"
// const fkcontent=await transformContent("1.md","OK",{transformers:[markdown]})
</script>
