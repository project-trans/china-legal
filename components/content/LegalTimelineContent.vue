<template>
    <li>
        <hr />
        <div class="timeline-middle">
            <svg v-if="dotType === 'fill_circle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor" class="h-5 w-5">
                <circle cx="10" cy="10" r="8" />
            </svg>
            <svg v-else-if="dotType === 'hollow_circle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                stroke="currentColor" class="h-5 w-5">
                <circle cx="10" cy="10" r="8" fill="transparent" stroke-width="1" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
            </svg>
        </div>
        <div class="timeline-end mb-5">
            <time class="font-mono">{{ date }}</time> <span v-if="author !== ''" class="font-serif ml-4">{{ author }}</span>
            <div v-if="title !== '' || level !== ''">
                <span v-if="titleLink === ''" class="text-lg font-black">{{ title }}</span>
                <NuxtLink v-else class="text-lg font-black" :to="titleLink">{{ title }}</NuxtLink>
                <span v-if="level != ''" class="badge">{{ level }}</span>
            </div>
            <div>
                <ContentSlot :use="$slots.default" />
            </div>
        </div>
        <hr />
    </li>
</template>
<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(defineProps<{
    date: string;
    title?: string;
    level?: string;
    author?: string;
    dotType?: "fill_circle" | "hollow_circle" | "none";
    titleLink?: string;
}>(), {
    title: "",
    level: "",
    author: "",
    dotType: "fill_circle",
    titleLink: "",
});

</script>