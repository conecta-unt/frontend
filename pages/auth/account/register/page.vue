<script setup lang="ts">
import * as z from "zod/v4";
const role = ref<string>();

const showInputs = computed(() => {
  if (role.value)
    return ["individual_client", "bussines_client"].includes(role.value);
  else return false;
});

const nameUserSchema = z
  .string()
  .min(1, "Debe contener al menos 1 caractér.")
  .max(50, "No debe contener más de 50 caracteres.");
</script>

<template>
  <NuxtLayout name="auth" title="Crear cuenta">
    <InputSelector
      v-model="role"
      label="¿Quién eres?"
      placeholder="Selecciona tu rol"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      :options="[
        { value: 'individual_client', text: 'Cliente Independiente' },
        { value: 'bussines_client', text: 'Empresa' },
        { value: 'teacher', text: 'Docente' },
        { value: 'student', text: 'Estudiante' },
      ]"
      class="w-full px-4"
    />

    <!-- <template v-if="role"> -->
    <SocialGoogle :role="role">Continuar con Google</SocialGoogle>

    <p v-show="role && !showInputs" class="text-white">
      Usa tu cuenta <span class="text-(--c-brand)">unitru</span>
    </p>

    <!-- <template v-if="showInputs"> -->
    <Separator content-classes="rounded-full">o</Separator>

    <!-- <FormInputAvailability
      label="Nombre de usuario"
      name="username"
      url-path="/user/info/find-username"
    /> -->
    <InputText
      class="w-full px-4"
      label="Nombres"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      name="firstname"
      :schema="nameUserSchema"
    />
    <InputText
      class="w-full px-4"
      label="Apellidos"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      name="lastname"
      :schema="nameUserSchema"
    />
    <!-- </template> -->
    <!-- </template> -->

    <template #footer>
      <p class="text-white">
        ¿Ya tienes una cuenta?
        <NuxtLink to="/auth/login" class="text-(--c-brand) underline">
          Inicia Sesión
        </NuxtLink>
      </p>
    </template>
  </NuxtLayout>
</template>
