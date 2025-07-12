<script setup lang="ts">
import type { OfferI } from "~/types/offer";
import OfferForm from "./offer-form.vue";

useSeoMeta({ title: "Mis ofertas | Conecta UNT" });

const { $axios } = useNuxtApp();

const offers = useState<OfferI[]>("offers", () => []);
const showForm = ref(false);

onMounted(async () => {
  const result = await $axios.get<OfferI[]>("/offer");
  offers.value = result.data;
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

      <section class="flex flex-col items-center w-full max-w-[700px] px-4">
        <p v-if="!offers.length">Aún no ha publicado ofertas.</p>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="offer in offers"
            :key="offer.id"
            class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
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

            <p class="text-gray-800 text-sm mb-4">
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
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
