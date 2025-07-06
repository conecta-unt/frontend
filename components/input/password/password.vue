<script setup lang="ts">
import { z } from "zod/v4";
import type { InputTextProps } from "../text/types";

interface Props extends InputTextProps {
  eyeProps?: {
    class?: string;
  };
}
const props = defineProps<Props>();

const model = defineModel({ default: "" });
const inputType = ref<"password" | "text">("password");
const passwordIcon = computed(() => {
  return inputType.value === "text" ? "mdi:eye" : "mdi:eye-off";
});

const toogleInputType = () => {
  if (inputType.value === "password") inputType.value = "text";
  else inputType.value = "password";
};

const passwordSchema = z
  .string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .refine((val) => /[a-z]/.test(val), {
    message: "Debe contener al menos una letra minúscula",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Debe contener al menos una letra mayúscula",
  })
  .refine((val) => /\d/.test(val), {
    message: "Debe contener al menos un número",
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: "Debe contener al menos un carácter especial (@$!%*?&)",
  });
</script>

<template>
  <InputText
    v-bind="props"
    v-model="model"
    :schema="passwordSchema"
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
