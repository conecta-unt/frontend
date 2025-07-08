<script setup lang="ts">
import { z } from "zod/v4";
import { areaSchema, bioSchema, majorSchema } from "~/schemas";
import type { UserProfileI } from "~/types/user";

const user = useState<UserProfileI>("user");
const { $axios } = useNuxtApp();

const roles: any = {
  individual_client: "Cliente Independiente",
  bussines_client: "Empresa",
  teacher: "Docente",
  student: "Estudiante",
};

const isEditing = ref(false);
const data = reactive<{
  major: string | undefined;
  area: string | undefined;
  bio: string | undefined;
}>({
  major: "",
  area: "",
  bio: "",
});

const dataSchema = z.object({
  major: majorSchema,
  area: areaSchema,
  bio: bioSchema,
});

const isValidData = computed(() => {
  const result = dataSchema.safeParse(data);
  return result.success;
});

const edit = async () => {
  try {
    await $axios.patch("/user/profile", data);

    isEditing.value = false;
    user.value.major = data.major || null;
    user.value.area = data.area || null;
    user.value.bio = data.bio || null;
  } catch {
    alert("Hay errores en los campos.");
  }
};

watch(user, () => {
  useSeoMeta({
    title: `${user.value.username} (${user.value.firstname} ${user.value.lastname}) | Conecta UNT`,
  });

  data.major = user.value.major || undefined;
  data.area = user.value.area || undefined;
  data.bio = user.value.bio || undefined;
});
</script>

<template>
  <NuxtLayout name="app">
    <div>
      <section class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div
            class="flex items-center justify-center rounded-full outline-1 outline-black overflow-hidden"
          >
            <img
              :src="user.profileImage || undefined"
              width="60"
              alt="Foto de perfil"
            />
          </div>
          <div>
            <h1 class="text-2xl">{{ user.firstname }} {{ user.lastname }}</h1>
            <p>@{{ user.username }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <p>
            Cuenta de
            <span class="text-(--c-text-2)">{{ roles[user.role] }}</span>
          </p>
          <template v-if="!isEditing">
            <p v-if="user.major">
              <span class="font-extrabold">Carrera:</span> {{ user.major }}
            </p>

            <p v-if="user.area">
              <span
                v-if="user.role === 'bussines_client'"
                class="font-extrabold"
                >Rubro:</span
              >
              <span v-else class="font-extrabold">Especialidad:</span>
              {{ user.area }}
            </p>

            <p v-if="user.bio">
              {{ user.bio }}
            </p>
          </template>
        </div>

        <div v-if="isEditing" class="flex flex-col gap-4">
          <InputText
            v-if="user.role !== 'bussines_client'"
            v-model="data.major"
            label="Carrera"
            class="max-w-md"
            :schema="majorSchema"
          />
          <InputText
            v-model="data.area"
            :label="user.role === 'bussines_client' ? 'Rubro' : 'Especialidad'"
            class="max-w-md"
            :schema="areaSchema"
          />
          <InputText
            v-model="data.bio"
            label="Biografía"
            class="max-w-md"
            :schema="bioSchema"
          />
        </div>
        <div>
          <Button v-show="!isEditing" @click="isEditing = true">
            <Icon name="mdi:pencil" /> Editar perfil
          </Button>
          <Button v-show="isEditing" @click="edit" :disabled="!isValidData">
            <Icon name="mdi:content-save" /> Guardar
          </Button>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
