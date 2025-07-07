<script setup lang="ts">
import type { InputBaseProps } from "../base/base.composable";

type CompatibilityProps = Omit<
  InputBaseProps,
  "type" | "autofocus" | "error" | "errorProps"
>;
interface Props extends CompatibilityProps {
  options: {
    value: any;
    text: string;
  }[];
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
  <InputBase
    v-bind="{ id, name, label, labelProps, inputProps, help, helpProps }"
  >
    <template #label="{ id }">
      <slot name="label" :for="id" />
    </template>

    <template #prefix-icon><slot name="prefix-icon" /></template>
    <template #prefix><slot name="prefix" /></template>

    <template #default="{ id, inputProps, onFocusin, onFocusout }">
      <select
        v-bind="inputProps"
        v-model="model"
        :name="name"
        :id="id"
        :data-placeholder="placeholder !== undefined"
        class="w-full outline-none"
        @focusin="onFocusin"
        @focusout="onFocusout"
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
    </template>

    <template #suffix><slot name="suffix" /></template>
    <template #suffix-icon><slot name="suffix-icon" /></template>

    <template #help><slot name="help" /></template>
  </InputBase>
</template>
