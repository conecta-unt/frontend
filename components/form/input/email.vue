<script setup lang="ts">
interface Props {
  label: string;
  name?: string;
}
defineProps<Props>();

const id = useId();
</script>

<template>
  <FormInputBase>
    <template #label>
      <label :for="id" class="text-white">{{ label }}</label>
    </template>

    <input
      type="email"
      :name="name"
      :id="id"
      class="outline-1 outline-white rounded-lg text-white p-2 w-full focus:outline-(--c-brand)"
    />
  </FormInputBase>
</template>
