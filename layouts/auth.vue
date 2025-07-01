<script setup lang="ts">
interface Props {
  title: string;
}
defineProps<Props>();

useSeoMeta({ title: "Registrate | ConectaUNT" });
</script>

<template>
  <main class="relative flex flex-col min-h-screen w-full bg-(--c-text)">
    <NuxtImg
      class="absolute w-full h-full top-0 left-0 object-cover opacity-30 -z-0 select-none"
      src="/images/background.jpg"
      alt="Background"
    />

    <section
      class="w-full z-10 py-16 px-4 flex flex-col items-center justify-center"
    >
      <Glass
        class="flex flex-col items-center justify-center gap-4 py-4 px-6 w-full max-w-[380px]"
      >
        <NuxtImg src="/images/logo.png" width="180" height="180" />

        <h1 class="text-3xl text-center text-white">{{ title }}</h1>

        <slot />

        <Separator v-if="$slots.footer" class="w-full" />

        <slot name="footer" />
      </Glass>
    </section>
  </main>
</template>
