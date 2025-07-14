<script setup lang="ts">
import type { OfferI } from "~/types/offer";
import OfferForm from "./offer-form.vue";

useSeoMeta({ title: "Mis ofertas | Conecta UNT" });

const { $axios } = useNuxtApp();

const offers = useState<OfferI[]>("offers", () => []);
const showForm = ref(false);
const verPostulaciones = ref<number | null>(null);

const allPostulations = ref<any[]>([]);
const postulacionesPorOferta = ref<{ [key: number]: any[] }>({});

const cargarPostulaciones = async () => {
  try {
    const response = await $axios.get("/offer/all-postulations");
    allPostulations.value = response.data;

    const agrupadas: { [key: number]: any[] } = {};
    for (const post of response.data) {
      const offerId = post.offer?.id;
      if (offerId) {
        if (!agrupadas[offerId]) agrupadas[offerId] = [];
        agrupadas[offerId].push(post);
      }
    }
    postulacionesPorOferta.value = agrupadas;
  } catch (error) {
    console.error("Error al cargar postulaciones:", error);
  }
};

onMounted(async () => {
  const result = await $axios.get<OfferI[]>("/offer");
  offers.value = result.data;
  await cargarPostulaciones();
});
</script>

<template>
  <NuxtLayout name="app" :role="['individual_client', 'bussines_client']">
    <div class="flex flex-col items-center justify-center w-full gap-6">
      <section class="flex w-full justify-end max-w-[700px] px-6">
        <Button @click="showForm = !showForm">
          <template v-if="!showForm">
            <Icon name="mdi:add" /> Publicar oferta
          </template>
          <template v-else>
            <Icon name="mdi:close" /> Cerrar formulario
          </template>
        </Button>
      </section>

      <section v-if="showForm" class="flex items-center justify-center w-full">
        <OfferForm />
      </section>

      <Separator class="max-w-[700px]" bgBefore="var(--c-primary)" />

      <section class="flex flex-col items-center w-full max-w-[900px] px-4">
        <p v-if="!offers.length">Aún no ha publicado ofertas.</p>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full"
        >
          <div
            v-for="offer in offers"
            :key="offer.id"
            class="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col"
          >
            <div class="flex items-center justify-between mb-3">
              <span
                class="text-sm px-3 py-1 rounded-full font-medium"
                :class="{
                  'bg-blue-100 text-blue-700': offer.type === 'internship',
                  'bg-green-100 text-green-700': offer.type === 'project',
                  'bg-yellow-100 text-yellow-700': offer.type === 'advisory',
                }"
              >
                {{
                  offer.type === "internship"
                    ? "Pasantía"
                    : offer.type === "project"
                    ? "Proyecto"
                    : "Asesoría"
                }}
              </span>

              <span class="text-xs text-gray-400">
                {{ new Date(offer.createdAt).toLocaleDateString() }}
              </span>
            </div>

            <p class="text-gray-800 text-sm mb-4 min-h-[60px]">
              {{ offer.description }}
            </p>

            <div
              class="flex justify-between text-xs text-gray-500 mt-auto gap-6"
            >
              <span>
                Supervisor:
                <span
                  :class="
                    offer.supervisorRequired ? 'text-green-600' : 'text-red-500'
                  "
                >
                  {{ offer.supervisorRequired ? "Sí" : "No" }}
                </span>
              </span>

              <span>
                En equipo:
                <span :class="offer.team ? 'text-green-600' : 'text-red-500'">
                  {{ offer.team ? "Sí" : "No" }}
                </span>
              </span>
            </div>

            <button
              class="mt-4 text-sm text-white bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-lg self-start shadow"
              @click="
                verPostulaciones =
                  verPostulaciones === offer.id ? null : offer.id
              "
            >
              {{
                verPostulaciones === offer.id
                  ? "Ocultar postulaciones"
                  : "Ver postulaciones"
              }}
            </button>

            <Transition name="fade">
              <div
                v-if="verPostulaciones === offer.id"
                class="mt-4 border-t pt-4 space-y-3"
              >
                <h3 class="text-sm font-semibold text-gray-700 mb-2">
                  Postulaciones recibidas:
                </h3>

                <div v-if="postulacionesPorOferta[offer.id]?.length">
                  <ul class="space-y-3">
                    <li
                      v-for="post in postulacionesPorOferta[offer.id]"
                      :key="post.id"
                      class="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    >
                      <div v-if="post.type === 'solo' && post.applicant">
                        <p class="text-sm font-medium text-gray-800">
                          Estudiante:
                          {{ post.applicant.firstname }}
                          {{ post.applicant.lastname }}
                          <NuxtLink
                            :to="`/app/perfil?user=${post.applicant.username}`"
                            class="text-blue-400 underline"
                          >
                            (@{{ post.applicant.username }})
                          </NuxtLink>
                        </p>
                      </div>
                      <div v-else-if="post.type === 'team' && post.team">
                        <p class="text-sm font-medium text-gray-800 mb-1">
                          Equipo: {{ post.team.name }}
                        </p>
                        <ul class="ml-4 list-disc text-xs text-gray-600">
                          <li
                            v-for="miembro in post.team.members"
                            :key="miembro.id"
                          >
                            {{ miembro.firstname }} {{ miembro.lastname }} -
                            <NuxtLink
                              :to="`/app/perfil?user=${miembro.username}`"
                              class="text-blue-400 underline"
                            >
                              (@{{ miembro.username }})
                            </NuxtLink>
                          </li>
                        </ul>
                      </div>

                      <p class="mt-3 text-sm">
                        Estado:
                        <span
                          :class="{
                            'text-blue-600': post.accepted === null,
                            'text-green-600': post.accepted === true,
                            'text-red-600': post.accepted === false,
                          }"
                          class="font-semibold"
                        >
                          {{
                            post.accepted === null
                              ? "Pendiente"
                              : post.accepted
                              ? "Aceptado"
                              : "Rechazado"
                          }}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>

                <div v-else class="text-sm text-gray-400 mt-3">
                  No hay postulaciones aún.
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
