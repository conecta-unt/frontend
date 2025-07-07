<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 1000,
  },
});

const count = ref(0);
const element = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const animate = () => {
  const start = 0;
  const end = props.value;
  const duration = props.duration;
  let startTime: number;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    count.value = Math.floor(progress * (end - start) + start);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          observer.value?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (element.value) {
    observer.value.observe(element.value);
  }
});

onUnmounted(() => {
  if (observer.value && element.value) {
    observer.value.unobserve(element.value);
  }
});
</script>

<template>
  <span ref="element">{{ count }}</span>
</template>
