<script setup lang="ts">
import { z } from "zod/v4";
import OfferTypeInput from "./offer-type-input.vue";
import { descriptionSchema, offerSchema } from "~/schemas";
import type { OfferI, OfferType } from "~/types/offer";

const offers = useState<OfferI[]>("offers");
const { $axios } = useNuxtApp();

const data = reactive<{
  type: OfferType | undefined;
  description: string | undefined;
  supervisorRequired: boolean | undefined;
  team: boolean | undefined;
}>({
  type: undefined,
  description: "",
  supervisorRequired: false,
  team: false,
});

const dataSchema = z.object({
  type: offerSchema,
  description: descriptionSchema,
  supervisorRequired: z.boolean(),
  team: z.boolean(),
});

const isInvalidData = computed(() => {
  const result = dataSchema.safeParse(data);
  return result.success;
});

const isLoading = ref(false);

const submit = async () => {
  try {
    isLoading.value = true;
    const offer = await $axios.post<OfferI>("/offer/create", data);
    offers.value = [offer.data, ...offers.value];
    data.type = undefined;
    data.description = "";
  } catch {}
  isLoading.value = false;
};
</script>

<template>
  <form
    @submit.prevent="submit"
    class="flex flex-col gap-4 w-full max-w-[500px]"
  >
    <OfferTypeInput v-model="data.type" class="w-full" :schema="offerSchema" />
    <InputTextarea
      v-model="data.description"
      label="Descripción"
      :schema="descriptionSchema"
    />

    <template v-if="data.type && ['advisory', 'project'].includes(data.type)">
      <InputCheckbox
        v-model="data.supervisorRequired"
        label="Requiere docente"
      />
      <InputCheckbox v-model="data.team" label="Postulación en equipo" />
    </template>

    <Button :disabled="!isInvalidData" :isLoading="isLoading">
      <Icon name="mdi:add" />
      Crear oferta
    </Button>
  </form>
</template>
