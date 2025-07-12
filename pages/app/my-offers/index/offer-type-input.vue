<script setup lang="ts">
const offerTypes = {
  internship: "Pasantia",
  project: "Proyecto",
  advisory: "Asesoria",
};

const model = defineModel();
</script>

<template>
  <InputBase v-model="model" label="Tipo de oferta">
    <template #default>
      <div class="flex justify-evenly w-full">
        <Button
          v-for="(value, key) in offerTypes"
          @click="model = key"
          :key="key"
          class="px-4"
          :class="{
            'bg-transparent border-2 border-(--c-brand)': model !== key,
          }"
          type="button"
        >
          {{ value }}
        </Button>
      </div>
    </template>
  </InputBase>
</template>
