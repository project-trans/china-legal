<template>
  <div class="max-w-4xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg">
    <main class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
      <slot />
    </main>
  </div>
  <div v-if="hasAnySource" class="max-w-4xl px-4 py-5 mt-5 m-auto sm:px-8 sm:shadow ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg">
    内容<span v-if="sourceList.length>0">来自于</span>
    <span v-if="sourceList.length>0&&isASCII(sourceList[0].url)">&nbsp;</span>
    <span v-for="(item, index) in sourceList" :key="index">
      <NuxtLink :href="item.url"  class="underline">
        <span v-if="item.isdel"><del>{{ getDisplayDomain(item.url) }}</del></span>
        <span v-else>{{ getDisplayDomain(item.url) }}</span>
      </NuxtLink>
      <!-- 如果当前不是最后一个元素，添加分隔符 -->
      <span v-if="index < sourceList.length - 1">、</span>
    </span>
    <span v-if="sourceList.length>0&&archiveList.length>0">，</span>
    <span v-if="archiveList.length>0">存档于</span>
    <span v-if="archiveList.length>0&&isASCII(archiveList[0].url)">&nbsp;</span>
    <span v-for="(item, index) in archiveList" :key="index">
      <NuxtLink :href="item.url" class="underline">
        <span v-if="item.isdel"><del>{{ getDisplayDomain(item.url) }}</del></span>
        <span v-else>{{ getDisplayDomain(item.url) }}</span>
      </NuxtLink>
      <!-- 如果当前不是最后一个元素，添加分隔符 -->
      <span v-if="index < archiveList.length - 1">、</span>
    </span>。
  </div>
  <WorkLicenseInfo v-if="page?.external?.copyright===true" class="mt-10 text-center w-full"/>
  <div class="text-center w-full"  :class="page?.external?.copyright===true ? '' : 'mt-10'">由 <img src="/img/project-trans-inline.svg" class="inline h-4" alt="PROJECT TRANS"> 提供。</div>
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue'
const { page } = useContent()
function isASCII(str: string): boolean {
  // 遍历字符串中的每个字符
  for (let i = 0; i < str.length; i++) {
    // 获取字符的 Unicode 编码，如果超出 ASCII 范围（0-127），返回 false
    if (str.charCodeAt(i) > 127) {
      return false;
    }
  }
  return true; // 如果所有字符都在范围内，返回 true
}

function getDomainWithoutWWW(url: string): string {
  // 使用 URL 对象解析输入的 URL
  const hostname = new URL(url).hostname;

  // 将域名按 '.' 分割成数组
  const domainParts = hostname.split('.');

  // 检查最次级域名是否为 'www'
  if (domainParts[0].toLowerCase() === 'www') {
    // 如果是 'www'，则删除它
    domainParts.shift();
  }

  // 返回处理后的域名
  return domainParts.join('.');
}
function getDisplayDomain(url: string): string {
  const result = getDomainWithoutWWW(url);
  
  // 定义需要替换的域名映射
  const domainReplacements: { [key: string]: string } = {
    'zh.wikisource.org': '维基文库',
    // 可以根据需要添加更多映射
  };

  // 检查结果是否在预定义的替换列表中
  return domainReplacements[result] || result;
}
let _hasAnySource=false
let hasSource=false
let hasArchive=false
let hasWikisource=false
let hasDelSource=false
const hasExternal=Boolean(page.value.external)
const sourceList :Array<any>=reactive([]);
const archiveList:Array<any>=reactive([]);
if(hasExternal){
  hasSource=Boolean(page.value.external?.source)
  hasArchive=Boolean(page.value.external?.archive)
  hasWikisource=Boolean(page.value.external?.wikisource)
  hasDelSource=Boolean(page.value.external?.deleted_source)
  _hasAnySource=hasSource||hasArchive||hasWikisource||hasDelSource

  function parseSourceArray(obj:any,isdel:boolean,list:Array<any>){
    if(Array.isArray(obj)){
      for (const item of obj){
        list.push({url:item,isdel:isdel})
      }
    }
    else{
      list.push({url:obj,isdel:isdel})
    }
  }

  if(hasSource){
    parseSourceArray(page.value.external.source,false,sourceList)
  }
  if(hasDelSource){
    parseSourceArray(page.value.external.deleted_source,true,sourceList)
  }
  if(hasWikisource){
    parseSourceArray(page.value.external.wikisource,false,sourceList)
  }
  if(hasArchive){
    parseSourceArray(page.value.external.archive,false,archiveList)
  }
}
const hasAnySource=ref(_hasAnySource)

//v-if="page.value?.external?.copyright===true"
// import markdown from '../modules/nuxt-content-transformers/markdown'
// import {transformContent} from "@nuxt/content/transformers/index"
// const fkcontent=await transformContent("1.md","OK",{transformers:[markdown]})
</script>
<style  lang="postcss">
@import "~/assets/css/tailwindcss-typography-prose-fix.css"
</style>
