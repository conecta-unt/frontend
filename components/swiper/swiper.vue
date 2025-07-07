<script setup lang="ts">
import { ref, computed } from "vue";
import { ArrowLeftCircleIcon } from "@heroicons/vue/24/solid";

interface SwiperProps {
  list: any[]; // si sabes qué tipo es cada item, ponlo en vez de any[]
  index: number;
}

const props = defineProps<SwiperProps>();
const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const container = ref<HTMLUListElement | null>(null);

const swiperStyle = computed(() => {
  if (!container.value) return {};

  const clientWidth = container.value.clientWidth;
  return {
    transform: `translateX(-${props.index * clientWidth}px)`,
  };
});
</script>

<template>
  <div class="swiper-container">
    <ul
      ref="container"
      class="swiper-wrapper"
      :style="swiperStyle"
      data-test="swiper-wrapper"
    >
      <li v-for="(item, idx) in props.list" :key="idx" class="h-full">
        <slot :item="item" />
      </li>
    </ul>

    <!-- pre btn -->
    <button
      v-if="props.index !== 0"
      @click="emit('change', props.index - 1)"
      class="toggle-btn prev"
      data-test="prev-btn"
    >
      <ArrowLeftCircleIcon />
    </button>
    <!-- next btn -->
    <button
      v-if="props.index !== props.list.length - 1"
      @click="emit('change', props.index + 1)"
      class="toggle-btn next"
      data-test="next-btn"
    >
      <ArrowLeftCircleIcon />
    </button>
  </div>
</template>
