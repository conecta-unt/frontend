<script setup lang="ts">
interface Props {
  label: string;
  options: {
    value: any;
    text: string;
  }[];
  name?: string;
  placeholder?: string;
}
const props = defineProps<Props>();

const id = useId();

const model = defineModel();

onMounted(() => {
  if (props.placeholder) model.value = undefined;
});
</script>

<template>
  <FormInputBase>
    <template #label>
      <label :for="id" class="text-white">{{ label }}</label>
    </template>

    <select
      v-model="model"
      :name="name"
      :id="id"
      :data-placeholder="placeholder !== undefined"
      class="outline-1 outline-white rounded-lg p-2 w-full focus:outline-(--c-brand)"
      :class="{
        'text-gray-300': model === undefined,
        'text-white': model,
      }"
    >
      <option
        v-if="placeholder"
        disabled
        data-is-placeholder="true"
        class="text-shadow-gray-400"
        :value="undefined"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :value="option.value"
        class="text-black"
      >
        {{ option.text }}
      </option>
    </select>
  </FormInputBase>
</template>
