<script setup lang="ts">
import type { OfferDetalledI } from "~/types/offer";

interface OfferI extends OfferDetalledI {
  postulationStatus: "solo" | "team" | null;
}

interface TeamI {
  id: number;
  name: string;
  ownerUsername: string;
}

const { $axios } = useNuxtApp();
const route = useRoute();

const offer = ref<OfferI | null>();
const teams = ref<TeamI[]>();
const teamOptions = computed(() => {
  if (!teams.value) return [];
  return teams.value.map((team) => ({
    value: team.id,
    text: `${team.name} - @${team.ownerUsername}`,
  }));
});
const teamSelected = ref<number>();

const isValidData = computed(() => {
  if (offer.value?.team && teamSelected.value) return true;
  if (offer.value?.team === false) return true;
  return false;
});

const sendPostulation = async () => {
  if (!offer.value) return;

  const data = {
    offerId: offer.value.id,
    teamId: teamSelected.value,
  };

  try {
    await $axios.post("/postulation/create", data);
    const result = await $axios.get<OfferI>(`/offer/${route.params.id}`);
    offer.value = result.data;
    alert("Se ha registrado la postulación");
  } catch {
    alert("Ha ocurrido un error");
  }
};

onMounted(async () => {
  try {
    const result = await $axios.get<OfferI>(`/offer/${route.params.id}`);
    offer.value = result.data;

    if (result.data.postulationStatus === null && result.data.team) {
      const rawTeams = await $axios.get<TeamI[]>(
        `/postulation/teams?offerId=${result.data.id}`
      );
      teams.value = rawTeams.data;
    }
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

      <section v-if="offer" class="flex flex-col w-full gap-6">
        <div
          v-if="offer.postulationStatus === null && offer.team"
          class="flex flex-col w-full"
        >
          <div class="flex gap-4 w-full">
            <InputSelector
              v-model="teamSelected"
              label="Selecciona tu equipo"
              placeholder="Selecciona tu equipo"
              :options="teamOptions"
              help="Si no aparece tu equipo, es probable que los miembros no hayan aceptado la invitación."
            />
          </div>
        </div>

        <Button
          v-if="offer.postulationStatus === null"
          @click="sendPostulation"
          :disabled="!isValidData"
        >
          <Icon name="mdi:send" />
          Enviar postulación
        </Button>
        <p v-else-if="offer.postulationStatus === 'solo'">
          Ya has postulado a esta oferta.
        </p>
        <p v-else-if="offer.postulationStatus === 'team'">
          Tu equipo ya a postulado a esta oferta.
        </p>
      </section>
    </div>
  </NuxtLayout>
</template>
