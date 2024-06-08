<template>
    <div class="not-prose">
     <p class="text-sm">{{content}}内容<span v-if="author!==''">由 <a v-bind:href="authorLink">{{author}}</a> 等人版权所有，</span>按 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0</a> 许可使用，转载必须按许可要求标注署名并注明来源，衍生作品仍需按许可分发。</p>
     <p xmlns:cc="http://creativecommons.org/ns#" >This work <span v-if="author!==''">by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" v-bind:href="authorLink">{{author}}</a> and others </span>is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;display:inline;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;display:inline;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;display:inline;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;display:inline;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>  
</div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  content?: string;
  author?:string;
  authorLink?:string;
}>(), {
    content: '本站',
    author: '',
    authorLink:'',
});

</script>
<style lang="postcss">
.prose ::marker {
  @apply text-black dark:text-white
}
</style>