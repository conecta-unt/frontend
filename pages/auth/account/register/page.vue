<script setup lang="ts">
import axios from "axios";
import * as z from "zod/v4";
import { API_URL, FRONTEND_URL } from "~/config/api";
import {
  emailSchema,
  nameUserSchema,
  passwordSchema,
  usernameSchema,
} from "~/schemas";

const route = useRoute();

const data = reactive<{
  role?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}>({
  role: undefined,
  username: undefined,
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  password: undefined,
});

const showInputs = computed(() => {
  if (data.role)
    return ["individual_client", "bussines_client"].includes(data.role);
  else return false;
});

const dataSchema = z.object({
  role: z.string(),
  username: usernameSchema,
  firstname: nameUserSchema,
  lastname: nameUserSchema,
  email: emailSchema,
  password: passwordSchema,
});

const isValidData = computed(() => {
  const result = dataSchema.safeParse(data);
  return result.success;
});

const information = ref({
  text: "",
  success: true,
});

const submit = async () => {
  const url = new URL(`${API_URL}/auth/account/create`);
  url.searchParams.set(
    "redirect-url",
    `${FRONTEND_URL}/auth/cuenta/confirmacion`
  );

  try {
    await axios.post(url.toString(), toValue(data));
    information.value = {
      text: "Se ha enviado un correo para confirmar su cuenta.",
      success: true,
    };
    data.role = undefined;
    data.username = undefined;
    data.firstname = undefined;
    data.lastname = undefined;
    data.email = undefined;
    data.password = undefined;
  } catch (error: unknown) {
    information.value.success = false;

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        information.value.text =
          "Los datos enviados son invalidos. Revise los datos antes de enviar.";
      } else if (error.response?.status === 409) {
        information.value.text = "El correo ya está en uso.";
      } else {
        information.value.text =
          "Oops, hubo un error inesperado. Intetelo más tarde o contactese con nosotros.";
      }
    } else {
      information.value.text =
        "Oops, hubo un error inesperado. Intetelo más tarde o contactese con nosotros.";
    }

    data.username = undefined;
    data.email = undefined;
    data.password = undefined;
  }
};

onMounted(() => {
  if (route.query.error === "provider_error")
    information.value.text =
      "Está intentando iniciar sesión con otro proveedor. Intente iniciar sesión con el método con el que creó su cuenta.";
  information.value.success = false;
});
</script>

<template>
  <NuxtLayout name="auth" title="Crear cuenta">
    <form @submit.prevent="submit" class="flex flex-col gap-4 w-full">
      <p
        v-if="information.text"
        class="text-lg"
        :class="{
          'text-green-500': information.success,
          'text-red-400': !information.success,
        }"
      >
        {{ information.text }}
      </p>

      <InputSelector
        v-model="data.role"
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

      <template v-if="data.role">
        <div class="flex flex-col w-full items-center gap-0.5">
          <SocialGoogle :role="data.role">Continuar con Google</SocialGoogle>

          <p v-show="data.role && !showInputs" class="text-white">
            Usa tu cuenta <span class="text-(--c-brand)">unitru</span>
          </p>
        </div>

        <template v-if="showInputs">
          <Separator content-classes="rounded-full">o</Separator>

          <InputAvailability
            class="w-full px-4"
            label="Nombre de usuario"
            :label-props="{ class: 'text-white' }"
            :input-props="{ class: 'text-white' }"
            :error-props="{ class: 'text-red-200' }"
            v-model="data.username"
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
            v-model="data.firstname"
            name="firstname"
            :schema="nameUserSchema"
          />

          <InputText
            class="w-full px-4"
            label="Apellidos"
            :label-props="{ class: 'text-white' }"
            :input-props="{ class: 'text-white' }"
            :error-props="{ class: 'text-red-200' }"
            v-model="data.lastname"
            name="lastname"
            :schema="nameUserSchema"
          />

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
          />

          <Button :disabled="!isValidData">Crear cuenta</Button>
        </template>
      </template>
    </form>

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
