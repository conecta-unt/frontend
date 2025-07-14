<script setup lang="ts">
import type { OfferDetalledI } from "~/types/offer";
import type { UserProfileI } from "~/types/user";
import Offer from "./offer.vue";

useSeoMeta({ title: "Conecta UNT" });

const { $axios } = useNuxtApp();

const user = useState<UserProfileI>("user");
const offers = ref<OfferDetalledI[]>();

const getOffers = async () => {
  if (user.value && ["student", "teacher"].includes(user.value.role)) {
    const result = await $axios.get("/offer/all");
    offers.value = result.data;
  }
};

watch(user, async () => {
  await getOffers();
});

onMounted(async () => {
  await getOffers();
});
</script>

<template>
  <NuxtLayout name="app">
    <section v-if="offers" class="flex flex-col gap-4 w-full">
      <Offer v-for="offer in offers" v-bind="offer" :key="offer.id" />
    </section>
  </NuxtLayout>
</template>
