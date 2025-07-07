<script setup lang="ts">
interface Props {
  image: string;
  title: string;
  subtitle?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="swiper-slide-container relative">
    <img :src="props.image" :alt="props.title" class="swiper-image"/>
    
    <!-- Contenedor de texto modificado -->
    <div class="absolute bottom-0 left-0 right-0 pt-10 pb-4 px-4
                bg-gradient-to-t from-black/80 to-transparent">
      <h2 class="text-2xl md:text-3xl font-bold text-white">
        {{ props.title }}
      </h2>
      <p class="text-white/90 text-sm md:text-base mt-1">
        {{ props.subtitle }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide-container {
  @apply w-full h-full;
}

.swiper-image {
  @apply w-full h-full object-cover;
}

</style>