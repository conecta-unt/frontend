<script setup lang="ts">
useSeoMeta({
  title: "Conecta UNT",
  description: "Conectamos talento universitario con oportunidades reales.",
});
</script>

<template>
  <NuxtLayout name="landing" full>
    <template #presentation>
      <h1 class="text-(--c-bg) text-4xl text-center">
        Bienvenido a <span class="text-(--c-brand)">ConectaUNT</span>
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
  </NuxtLayout>
</template>
