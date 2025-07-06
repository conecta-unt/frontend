<script setup lang="ts">
import * as z from "zod/v4";
import type { $ZodIssue } from "zod/v4/core";
import type { InputBaseProps } from "../base/base.composable";

interface Props extends InputBaseProps {
  schema?: z.ZodString;
  showAllErrors?: boolean;
  showErrorBullets?: boolean;
}
const props = defineProps<Props>();

const model = defineModel({ default: "" });
const issues = ref<$ZodIssue[]>();

const error = computed(() => {
  if (!issues.value || !issues.value.length) return undefined;
  return issues.value[0].message;
});

const validate = () => {
  if (!props.schema) return;

  const result = props.schema.safeParse(model.value);

  if (!result.success) {
    issues.value = result.error.issues;
  } else {
    issues.value = undefined;
  }
};
</script>

<template>
  <InputBase v-bind="props">
    <template #label="{ id }">
      <slot name="label" :for="id" />
    </template>

    <template #prefix-icon><slot name="prefix-icon" /></template>
    <template #prefix><slot name="prefix" /></template>

    <template #default="{ type, ref, id, inputProps, onFocusin, onFocusout }">
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
            validate();
          }
        "
        class="w-full outline-none"
      />
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
          <li v-for="issuee in issues" :key="issuee.code" class="text-red-500">
            {{ issuee.message }}
          </li>
        </ul>
      </slot>
    </template>
  </InputBase>
</template>
