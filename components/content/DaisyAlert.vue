<!-- This component is used to show Markdown code block examples -->
<template>
  <div class="card w-full bg-amber-200 text-black dark:bg-amber-700 dark:text-white">
  <div class="card-body">
    <h2 v-if="title!=''" class="card-title not-prose">{{ title }}</h2>
    <div><ContentSlot v-if="!isContentEmpty"  :use="$slots.default"/></div>
  </div>
</div>
</template>
<script setup lang="ts">
import { computed, useSlots  } from "vue";
const slots = useSlots();

const props = withDefaults(defineProps<{
  title?: string;
}>(), {
  title: '',
});
const isContentEmpty = computed(() => slots.default == null)

</script>
<style lang="postcss">
.prose ::marker {
  @apply text-black dark:text-white
}
</style>