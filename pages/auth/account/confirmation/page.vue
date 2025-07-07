<script setup lang="ts">
import axios from "axios";
import { API_URL } from "~/config/api";

const route = useRoute();

const info = reactive({
  text: "",
  success: false,
});

onMounted(async () => {
  if (!route.query.token) {
    info.text = "El token de confirmación no es válido";
    return;
  }

  try {
    await axios.get(
      `${API_URL}/auth/account/confirm?token=${route.query.token}`
    );
    info.text = "Ha confirmado su cuenta correctamente.";
    info.success = true;
  } catch {
    info.text = "El token de confirmación ha caducado o ya ha sido usado.";
  }
});
</script>

<template>
  <NuxtLayout name="auth" title="Confirma tu cuenta">
    <p
      class="tetx-lg"
      :class="{
        'text-red-400': !info.success,
        'text-green-400': info.success,
      }"
    >
      {{ info.text }}
    </p>

    <Button v-if="info.success" to="/auth/login" class="w-full">
      Inicia Sesión
    </Button>
  </NuxtLayout>
</template>
