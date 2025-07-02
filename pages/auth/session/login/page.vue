<script setup lang="ts"></script>

<template>
  <NuxtLayout name="auth" title="Iniciar Sesión">
    <template #footer>
      <p class="text-white">
        ¿No tienes una cuenta?
        <NuxtLink
          to="/auth/cuenta/registrate"
          class="text-(--c-brand) underline"
        >
          Crea una cuenta
        </NuxtLink>
      </p>
    </template>
  </NuxtLayout>
</template>
