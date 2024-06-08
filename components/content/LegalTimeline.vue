<template>
    <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical not-prose">
        <ContentSlot :use="$slots.default" />
    </ul>
</template>
<style lang="postcss">
.timeline-vertical:where(.timeline-snap-icon)>li {
    --timeline-col-start: 0;
}
</style>