<script setup lang="ts">
import { useValidationInput } from "../composables/use-validation.composable.";
import type { InputTextProps } from "./types";

const props = defineProps<InputTextProps>();
const model = defineModel({ default: "" });

const { error, issues, validate } = useValidationInput({
  schema: props.schema,
});
</script>

<template>
  <InputBase
    v-bind="{
      ...props,
      schema: undefined,
      showAllErrors: undefined,
      showErrorBullets: undefined,
      modelValue: undefined,
    }"
    :error="error"
  >
    <template #label="{ id }">
      <slot name="label" :id="id" />
    </template>

    <template #prefix-icon><slot name="prefix-icon" /></template>
    <template #prefix><slot name="prefix" /></template>

    <template #default="{ type, ref, id, inputProps, onFocusin, onFocusout }">
      <slot
        :type="type"
        :ref="ref"
        :id="id"
        :inputProps="inputProps"
        :validate="validate"
        @focusin="onFocusin"
        @focusout="
          () => {
            onFocusout();
            validate(model);
          }
        "
      >
        <input
          v-bind="inputProps"
          v-model="model"
          :ref="ref"
          :id="id"
          :type="type"
          @focusin="onFocusin"
          @focusout="
            () => {
              onFocusout();
              validate(model);
            }
          "
          class="w-full outline-none"
        />
      </slot>
    </template>

    <template #suffix><slot name="suffix" /></template>
    <template #suffix-icon><slot name="suffix-icon" /></template>

    <template #help><slot name="help" /></template>

    <template #error>
      <slot name="error" :error="error" :issues="issues">
        <p
          v-if="error && !showAllErrors"
          v-bind="errorProps"
          class="text-red-500"
        >
          {{ error }}
        </p>
        <ul
          v-if="issues && showAllErrors"
          :class="{ 'list-inside list-disc': showErrorBullets }"
        >
          <li
            v-for="issuee in issues"
            :key="issuee.code"
            v-bind="errorProps"
            class="text-red-500"
          >
            {{ issuee.message }}
          </li>
        </ul>
      </slot>
    </template>
  </InputBase>
</template>
