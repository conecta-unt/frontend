<script setup lang="ts">
import { passwordSchema } from "~/schemas";
import type { InputTextProps } from "../text/types";

interface Props extends InputTextProps {
  eyeProps?: {
    class?: string;
  };
  validate?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  validate: true,
});

const model = defineModel({ default: "" });
const inputType = ref<"password" | "text">("password");
const passwordIcon = computed(() => {
  return inputType.value === "text" ? "mdi:eye" : "mdi:eye-off";
});

const toogleInputType = () => {
  if (inputType.value === "password") inputType.value = "text";
  else inputType.value = "password";
};
</script>

<template>
  <InputText
    v-bind="props"
    v-model="model"
    :schema="validate ? passwordSchema : undefined"
    :type="inputType"
    show-all-errors
    show-error-bullets
  >
    <template
      #default="{ ref, id, validate, inputProps, onFocusin, onFocusout }"
    >
      <input
        v-bind="inputProps"
        v-model="model"
        :ref="ref"
        :id="id"
        :type="inputType"
        @focusin="onFocusin"
        @focusout="
          () => {
            onFocusout();
            validate(model);
          }
        "
        class="w-full outline-none"
      />
    </template>

    <template #suffix-icon>
      <button @click="toogleInputType" type="button" class="flex px-2">
        <Icon
          v-bind="eyeProps"
          :name="passwordIcon"
          size="24"
          class="text-white"
        />
      </button>
    </template>
  </InputText>
</template>
