<script setup lang="ts">
const links = [
  { to: "/", text: "Inicio" },
  { to: "/sobre-nosotros", text: "Sobre nosotros" },
  { to: "/oportunidades", text: "Oportunidades" },
];
</script>

<template>
  <main>
    <section class="relative flex flex-col w-full min-h-screen bg-(--c-text)">
      <NuxtImg
        class="absolute w-full h-full top-0 left-0 object-cover opacity-30 -z-0"
        src="/images/background.jpg"
        alt="Background"
      />

      <header class="w-full z-10">
        <div
          class="flex flex-col sm:flex-row items-center justify-center py-4 px-4"
        >
          <NuxtLink to="/">
            <NuxtImg width="90" src="/images/logo.png" alt="Logo UNT" />
          </NuxtLink>

          <nav class="sm:flex-1">
            <ol class="w-full flex items-center gap-4 sm:justify-end">
              <li v-for="link in links" :key="link.text">
                <NuxtLink :to="link.to" class="text-(--c-bg)">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <div
        class="flex-1 flex flex-col items-center justify-center h-full z-10 gap-8"
      >
        <div class="flex flex-col gap-4">
          <h1 class="text-(--c-bg) text-4xl text-center">
            Bienvenido a <span class="text-(--c-brand)">ConectaUNT</span>
          </h1>
          <h2 class="text-(--c-bg) text-lg text-center">
            Donde conectamos talento universitario con oportunidades reales
          </h2>
        </div>

        <div class="flex items-center justify-center gap-10 z-10">
          <NuxtLink
            to="/registrar"
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
        </div>
      </div>
    </section>
  </main>
  <footer></footer>
</template>
