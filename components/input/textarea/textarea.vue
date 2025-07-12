<script setup lang="ts">
import type { InputTextProps } from "../text/types";

const props = defineProps<InputTextProps>();

const model = defineModel({ default: "" });
</script>

<template>
  <InputText v-bind="props">
    <template #default="{ id, inputProps, onFocusin, onFocusout }">
      <textarea
        v-model="model"
        v-bind="{ id, ...inputProps, onFocusin, onFocusout }"
        class="w-full outline-none"
      ></textarea>
    </template>
  </InputText>
</template>
