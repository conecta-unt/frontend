<script setup lang="ts">
interface Props {
  full?: boolean;
}
defineProps<Props>();

const links = [
  { to: "/", text: "Inicio" },
  { to: "/sobre-nosotros", text: "Sobre nosotros" },
  { to: "/oportunidades", text: "Oportunidades" },
];
</script>

<template>
  <main>
    <section
      class="relative flex flex-col w-full bg-(--c-text)"
      :class="{
        'min-h-screen': full,
        'min-h-[60vh] pb-10': !full,
      }"
    >
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

          <nav class="sm:flex-1 flex flex-col sm:flex-row gap-2">
            <ol class="flex-1 flex items-center gap-4 sm:justify-end">
              <li v-for="link in links" :key="link.text">
                <NuxtLink :to="link.to" class="text-(--c-bg)">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ol>

            <div class="flex items-center justify-center w-full sm:w-auto">
              <NuxtLink
                to="/login"
                class="bg-(--c-brand) text-(--c-text) text-md font-bold px-2 rounded-lg"
              >
                Inicia Sesión
              </NuxtLink>
            </div>
          </nav>
        </div>
      </header>

      <div
        class="flex-1 flex flex-col items-center justify-center h-full z-10 gap-8"
      >
        <div v-if="$slots.presentation" class="flex flex-col gap-4">
          <slot name="presentation" />
        </div>

        <div
          v-if="$slots.links"
          class="flex items-center justify-center gap-10 z-10"
        >
          <slot name="links" />
        </div>
      </div>
    </section>
  </main>

  <div v-if="$slots.default" class="relative z-10 w-full">
          <slot />
        </div>

  <footer
    class="flex flex-col md:flex-row items-center justify-center w-full bg-(--c-primary) py-8 px-4 text-(--c-bg) gap-2 md:gap-4"
  >
    <p>Síguenos en redes sociales: @ConectaUNT</p>
    <p>&copy 2025. Todos los derechos reservados.</p>
  </footer>
</template>
