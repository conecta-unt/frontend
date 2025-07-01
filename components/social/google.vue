<script setup lang="ts">
import { googleSdkLoaded } from "vue3-google-login";
import { BACKEND_URL, FRONTEND_URL } from "~/config/api";
import { GOOGLE_CLIENT_ID } from "~/config/social";

const sendCodeToBackend = async (code: string) => {
  const backendUrl = new URL(`${BACKEND_URL}/api/v1/auth/social/google`);
  backendUrl.searchParams.set("code", code);
  backendUrl.searchParams.set("redirect-url", `${FRONTEND_URL}/auth/login`);
  backendUrl.searchParams.set(
    "redirect-error-url",
    `${FRONTEND_URL}/auth/login`
  );

  window.location.href = backendUrl.toString();
};

const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initCodeClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "email profile",
        redirect_uri: `${FRONTEND_URL}/dashboard`,
        callback: (response) => {
          if (response.code) {
            sendCodeToBackend(response.code);
          }
        },
      })
      .requestCode();
  });
};
</script>

<template>
  <button
    class="flex items-center justify-center p-2 gap-4 bg-(--c-brand) outline-none w-full rounded-3xl cursor-pointer"
    @click="login"
  >
    <Icon name="mdi:google" />
    <span><slot /></span>
  </button>
</template>
