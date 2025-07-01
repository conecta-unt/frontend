<script setup lang="ts"></script>

<template>
  <NuxtLayout name="auth" title="Crear cuenta">
    <FormInputSelector
      label="¿Quién eres?"
      placeholder="Selecciona tu rol"
      :options="[
        { value: 'individual_client', text: 'Cliente Independiente' },
        { value: 'bussines_client', text: 'Empresa' },
        { value: 'teacher', text: 'Docente' },
        { value: 'student', text: 'Estudiante' },
      ]"
    />

    <template #footer>
      <p class="text-white">
        ¿Ya tienes una cuenta?
        <NuxtLink to="/auth/login" class="text-(--c-brand) underline"
          >Inicia Sesión</NuxtLink
        >
      </p>
    </template>
  </NuxtLayout>
</template>
