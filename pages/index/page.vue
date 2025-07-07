<script setup lang="ts">
import CounterAnimation from "./counter-animation.vue";
import { swiperData, stats } from "./data";

const index = ref(0);

const change = (idx: number) => {
  if (idx >= swiperData.length) index.value = 0;
  else index.value = idx;
};

let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  interval = setInterval(() => {
    change(index.value + 1);
  }, 3000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <NuxtLayout name="landing" full>
    <template #presentation>
      <h1 class="text-(--c-bg) text-4xl text-center">
        Bienvenido a <span class="text-(--c-brand)">Conecta UNT</span>
      </h1>
      <h2 class="text-(--c-bg) text-lg text-center">
        Donde conectamos talento universitario con oportunidades reales
      </h2>
    </template>

    <template #links>
      <NuxtLink
        to="/auth/cuenta/registrate"
        class="bg-(--c-brand) text-(--c-text) text-lg font-bold py-1 px-4 rounded-lg"
      >
        Regístrate
      </NuxtLink>

      <NuxtLink
        to="/sobre-nosotros"
        class="border-1 border-(--c-bg) text-(--c-bg) text-lg font-bold py-1 px-4 rounded-lg"
      >
        Más
      </NuxtLink>
    </template>

    <section class="py-5 px-4 bg-white">
      <div
        class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 text-center"
      >
        <!-- Cada ítem de estadística -->
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="flex flex-col items-center"
        >
          <div class="text-4xl font-bold mb-2" :class="stat.color">
            <span v-if="stat.prefix">+</span>
            <CounterAnimation :value="stat.value" :duration="800" />
          </div>
          <p class="text-gray-700 text-lg">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <div class="w-full py-8">
      <div class="py-10 container mx-auto px-4">
        <div class="text-center mb-6">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
            Tu esfuerzo merece visibilidad
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Conéctate con iniciativas que reconocen tu talento, brindan
            experiencia práctica y te preparan para el mundo real.
          </p>
        </div>
        <Swiper :list="swiperData" :index="index" @change="change">
          <template #default="{ item }">
            <div class="relative h-full">
              <SwiperSlide v-bind="item" />
              <div
                class="absolute inset-x-0 bottom-0 p-4 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)_0%,transparent_100%)]"
              >
                {{ item.description }}
              </div>
            </div>
          </template>
        </Swiper>
      </div>
    </div>

    <section class="py-20 px-4 bg-white flex justify-center">
      <div class="max-w-7xl w-full">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
            ¿Cómo funciona?
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            Tres simples pasos para conectar talento con oportunidades
          </p>
        </div>

        <div class="mt-16 flex flex-wrap justify-center gap-8">
          <div
            class="flex flex-col items-center text-center w-full sm:w-[47%] lg:w-[30%]"
          >
            <div
              class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4"
            >
              <span class="text-white font-bold text-xl">1</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Crea tu perfil
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Completa tu perfil académico y profesional, agrega tus habilidades
              y experiencias.
            </p>
          </div>

          <div
            class="flex flex-col items-center text-center w-full sm:w-[47%] lg:w-[30%]"
          >
            <div
              class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4"
            >
              <span class="text-white font-bold text-xl">2</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Recibe matches
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Nuestro algoritmo te conecta con oportunidades que se ajustan a tu
              perfil y preferencias.
            </p>
          </div>

          <div
            class="flex flex-col items-center text-center w-full sm:w-[47%] lg:w-[30%]"
          >
            <div
              class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4"
            >
              <span class="text-white font-bold text-xl">3</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Consigue el trabajo
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Aplica directamente a las ofertas y comienza tu carrera
              profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
