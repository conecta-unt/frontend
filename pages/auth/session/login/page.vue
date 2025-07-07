<script setup lang="ts">
import z from "zod/v4";
import { API_URL, FRONTEND_URL } from "~/config/api";
import { emailSchema } from "~/schemas";

const router = useRouter();
const { $axios } = useNuxtApp();

const data = reactive<{
  email?: string;
  password?: string;
}>({
  email: undefined,
  password: undefined,
});

const dataSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

const isValidData = computed(() => {
  const result = dataSchema.safeParse(data);
  return result.success;
});

const information = ref({
  text: "",
  success: false,
});

const submit = async () => {
  const url = new URL(`${API_URL}/auth/session/login`);
  url.searchParams.set("redirect-url", `${FRONTEND_URL}/app`);

  try {
    await $axios.post(url.toString(), toValue(data));
    data.email = undefined;
    data.password = undefined;
    router.push("/app");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        information.value.text =
          "Inicie sesión con el método con el que creó su cuenta.";
      } else if (error.response?.status === 401) {
        information.value.text =
          "Debe confirma su cuenta antes de entrar a la aplicación.";
      } else if (
        error.response?.status === 403 &&
        error.response.data.error.message === "Invalid credentials."
      ) {
        information.value.text = "Las credenciales son incorrectas.";
      } else if (error.response?.status === 403) {
        information.value.text =
          "Demasiados intentos fallidos. Intentelo de nuevo dentro de 10 minutos.";
      } else if (error.response?.status === 404) {
        information.value.text = "El usuario no existe.";
      } else {
        information.value.text =
          "Oops, hubo un error inesperado. Intetelo más tarde o contactese con nosotros.";
      }
    } else {
      information.value.text =
        "Oops, hubo un error inesperado. Intetelo más tarde o contactese con nosotros.";
    }

    data.password = undefined;
  }
};
</script>

<template>
  <NuxtLayout name="auth" title="Iniciar Sesión">
    <div class="flex flex-col gap-4 w-full">
      <SocialGoogle>Inicia sesión con google</SocialGoogle>

      <Separator content-classes="rounded-full">o</Separator>

      <form @submit.prevent="submit" class="flex flex-col gap-4 w-full">
        <InputText
          class="w-full px-4"
          label="Correo Electrónico"
          :label-props="{ class: 'text-white' }"
          :input-props="{ class: 'text-white' }"
          :error-props="{ class: 'text-red-200' }"
          v-model="data.email"
          name="email"
          :schema="emailSchema"
        />

        <InputPassword
          class="w-full px-4"
          label="Contraseña"
          :label-props="{ class: 'text-white' }"
          :input-props="{ class: 'text-white' }"
          :error-props="{ class: 'text-red-100' }"
          v-model="data.password"
          name="password"
          :validate="false"
        />

        <p
          v-if="information.text"
          class="text-lg text-center"
          :class="{
            'text-green-500': information.success,
            'text-red-400': !information.success,
          }"
        >
          {{ information.text }}
        </p>

        <Button :disabled="!isValidData">Iniciar Sesión</Button>
      </form>
    </div>

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
