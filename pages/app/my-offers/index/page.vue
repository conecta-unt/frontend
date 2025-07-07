<script setup lang="ts">
import OfferForm from "./offer-form.vue";

useSeoMeta({ title: "Mis ofertas | Conecta UNT" });

const offers = useState("offers", () => []);
const showForm = ref(false);
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

      <section v-if="showForm">
        <OfferForm />
      </section>

      <Separator class="max-w-[700px]" bgBefore="var(--c-primary)" />

      <section class="flex flex-col items-center w-full max-w-[700px] px-4">
        <p v-if="!offers.length">Aún no ha publicado ofertas.</p>
      </section>
    </div>
  </NuxtLayout>
</template>
