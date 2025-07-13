<script setup lang="ts">
import type { OfferDetalledI } from "~/types/offer";

const { $axios } = useNuxtApp();
const route = useRoute();

const offer = ref<OfferDetalledI | null>();
const teams = ref();

onMounted(async () => {
  try {
    const result = await $axios.get(`/offer/${route.params.id}`);
    offer.value = result.data;
  } catch {
    offer.value = null;
  }
});
</script>

<template>
  <NuxtLayout name="app">
    <div class="flex flex-col w-full gap-8">
      <section
        v-if="offer === null"
        class="flex flex-col gap-6 justify-center w-full"
      >
        <p class="text-2xl text-center">Oferta no encontrada</p>
        <Button to="/app">
          <Icon name="mdi:arrow-left" />
          Inicio
        </Button>
      </section>

      <section v-if="offer" class="flex flex-col w-full gap-4">
        <div class="">
          <p>
            Oferta de: {{ offer.user.profile.firstname }}
            {{ offer.user.profile.lastname }}
          </p>
          <span class="text-xs text-gray-400">
            {{ new Date(offer.createdAt).toLocaleDateString() }}
          </span>
        </div>

        <p class="">
          {{ offer.description }}
        </p>

        <div
          v-if="offer.type !== 'internship'"
          class="flex flex-col text-gray-500 mt-auto"
        >
          <p>
            Supervisor:
            <span
              :class="
                offer.supervisorRequired ? 'text-green-600' : 'text-red-500'
              "
            >
              {{ offer.supervisorRequired ? "Requerido" : "No requerido" }}
            </span>
          </p>

          <p>
            En equipo:
            <span :class="offer.team ? 'text-green-600' : 'text-red-500'">
              {{ offer.team ? "Requerido" : "No requerido" }}
            </span>
          </p>
        </div>
      </section>

      <Separator bg-before="var(--c-primary)" />

      <section v-if="offer" class="flex flex-col w-full">
        <div v-if="offer.team" class="flex flex-col w-full">
          <div class="flex gap-4 w-full">
            <p>Selecciona tu equipo:</p>
          </div>
          <span class="text-sm">
            Si no aparece tu equipo, es probable que los miembros no hayan
            aceptado la invitación.
          </span>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
