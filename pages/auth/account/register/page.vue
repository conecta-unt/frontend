<script setup lang="ts">
const role = ref<string>();

const showInputs = computed(() => {
  if (role.value)
    return ["individual_client", "bussines_client"].includes(role.value);
  else return false;
});
</script>

<template>
  <NuxtLayout name="auth" title="Crear cuenta">
    <FormInputSelector
      v-model="role"
      label="¿Quién eres?"
      placeholder="Selecciona tu rol"
      :options="[
        { value: 'individual_client', text: 'Cliente Independiente' },
        { value: 'bussines_client', text: 'Empresa' },
        { value: 'teacher', text: 'Docente' },
        { value: 'student', text: 'Estudiante' },
      ]"
    />

    <template v-if="role">
      <SocialGoogle>Continuar con Google</SocialGoogle>

      <p v-show="!showInputs" class="text-white">
        Usa tu cuenta <span class="text-(--c-brand)">unitru</span>
      </p>

      <template v-if="showInputs">
        <Separator content-classes="rounded-full">o</Separator>
      </template>
    </template>

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
