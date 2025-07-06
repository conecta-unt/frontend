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

const emailSchema = z.email("Ingrese una dirección de correo válido.");
const usernameSchema = z
  .string()
  .min(3, "Debe contener al menos 3 caracteres.")
  .max(32, "Debe contener máximo 32 caracteres.");
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
    <div class="flex flex-col w-full items-center gap-0.5">
      <SocialGoogle :role="role">Continuar con Google</SocialGoogle>

      <p v-show="role && !showInputs" class="text-white">
        Usa tu cuenta <span class="text-(--c-brand)">unitru</span>
      </p>
    </div>

    <!-- <template v-if="showInputs"> -->
    <Separator content-classes="rounded-full">o</Separator>

    <InputAvailability
      class="w-full px-4"
      label="Nombre de usuario"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      :error-props="{ class: 'text-red-200' }"
      name="username"
      :schema="usernameSchema"
      url="/user/info/find-username"
    />
    <InputText
      class="w-full px-4"
      label="Nombres"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      :error-props="{ class: 'text-red-200' }"
      name="firstname"
      :schema="nameUserSchema"
    />
    <InputText
      class="w-full px-4"
      label="Apellidos"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      :error-props="{ class: 'text-red-200' }"
      name="lastname"
      :schema="nameUserSchema"
    />
    <InputText
      class="w-full px-4"
      label="Correo Electrónico"
      :label-props="{ class: 'text-white' }"
      :input-props="{ class: 'text-white' }"
      :error-props="{ class: 'text-red-200' }"
      name="email"
      :schema="emailSchema"
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
