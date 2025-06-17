<script setup lang="ts">
useSeoMeta({
  title: "Conecta UNT",
  description: "Conectamos talento universitario con oportunidades reales.",
});

import Hero from "./components/hero.vue";
</script>

<template>
  <main>
    <Hero />
  </main>

  <footer
    class="flex flex-col md:flex-row items-center justify-center w-full bg-(--c-primary) py-8 px-4 text-(--c-bg) gap-2 md:gap-4"
  >
    <p>Síguenos en redes sociales: @ConectaUNT</p>
    <p>&copy 2025. Todos los derechos reservados.</p>
  </footer>
</template>
