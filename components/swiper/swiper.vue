<script setup lang="ts">
import { ref, computed } from "vue";
import { ArrowLeftCircleIcon } from "@heroicons/vue/24/solid";

interface SwiperProps {
  list: any[];
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
  <div
    class="relative border border-gray-300 w-full max-w-3xl mx-auto h-80 overflow-hidden rounded-lg"
  >
    <ul
      ref="container"
      class="flex h-full transition-transform duration-300 ease-in-out"
      :style="swiperStyle"
    >
      <li
        v-for="(item, idx) in props.list"
        :key="idx"
        class="flex-none w-full h-full"
      >
        <slot :item="item" />
      </li>
    </ul>

    <!-- pre btn -->
    <button
      v-if="props.index !== 0"
      @click="emit('change', props.index - 1)"
      class="opacity-80 cursor-pointer text-white absolute z-10 w-14 h-14 transition-colors duration-300 top-1/2 transform -translate-y-1/2 hover:opacity-100 left-2"
    >
      <ArrowLeftCircleIcon />
    </button>
    <!-- next btn -->
    <button
      v-if="props.index !== props.list.length - 1"
      @click="emit('change', props.index + 1)"
      class="opacity-80 cursor-pointer text-white absolute z-10 w-14 h-14 transition-colors duration-300 top-1/2 transform -translate-y-1/2 hover:opacity-100 right-2 rotate-180"
    >
      <ArrowLeftCircleIcon />
    </button>
  </div>
</template>
