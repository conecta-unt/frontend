<script setup lang="ts">
import * as z from "zod/v4";
import type { InputBaseProps } from "../base/base.composable";
import { useValidationInput } from "../composables/use-validation.composable.";
import axios from "axios";
import { API_URL } from "~/config/api";

type Baseprops = Omit<InputBaseProps, "type" | "autofocus">;
interface Props extends Baseprops {
  schema?: z.ZodString;
  url: string;
}
const props = defineProps<Props>();
const model = defineModel({ default: "" });
const isAvailableValue = ref(false);

const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const validationInput = useValidationInput({
  schema: props.schema,
});

const inputError = ref();

const handler = async (value: string) => {
  validationInput.validate(value);

  if (validationInput.issues.value && validationInput.issues.value.length) {
    inputError.value = validationInput.issues.value[0].message;
    return;
  } else {
    inputError.value = undefined;

    try {
      await axios.get<boolean>(`${API_URL}${props.url}?q=${value}`);
      isAvailableValue.value = false;
    } catch (error) {
      console.error("Error checking availability:", error);
      isAvailableValue.value = true;
    }
  }
};

const debouncedFetch = (value: string) => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = setTimeout(() => {
    handler(value);
  }, 500);
};

watch(model, (newValue) => {
  debouncedFetch(newValue);
});

onUnmounted(() => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }
});
</script>

<template>
  <InputBase
    v-bind="{
      ...props,
      schema: undefined,
      url: undefined,
    }"
    :error="inputError"
  >
    <template #label="{ id }">
      <slot name="label" :for="id" />
    </template>

    <template #prefix-icon><slot name="prefix-icon" /></template>
    <template #prefix><slot name="prefix" /></template>

    <template #default="{ id, inputProps, onFocusin, onFocusout }">
      <input
        v-bind="inputProps"
        v-model="model"
        :name="name"
        :id="id"
        class="w-full outline-none"
        @focusin="onFocusin"
        @focusout="onFocusout"
        type="text"
      />
    </template>

    <template #suffix><slot name="suffix" /></template>
    <template #suffix-icon><slot name="suffix-icon" /></template>

    <template #help>
      <slot
        name="help"
        :isAvailableValue="isAvailableValue"
        :model="model"
        :inputError="inputError"
      >
        <p v-if="isAvailableValue" v-bind="helpProps" class="text-green-500">
          Disponible
        </p>
        <p
          v-else-if="model && !isAvailableValue && !inputError"
          v-bind="helpProps"
          class="text-red-500"
        >
          No Disponible
        </p>
      </slot>
    </template>
    <template #error>
      <p v-if="inputError" v-bind="errorProps" class="text-red-500">
        {{ inputError }}
      </p>
    </template>
  </InputBase>
</template>
