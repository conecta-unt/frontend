<script setup lang="ts">
import { z } from "zod/v4";
import { areaSchema, bioSchema, majorSchema } from "~/schemas";
import type { UserProfileI } from "~/types/user";

const route = useRoute();
const user = useState<UserProfileI>("user");
const profile = ref<UserProfileI | null>();
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

const getUserProfile = async () => {
  if (!user.value) return;

  const q = route.query.user;
  if (!q || user.value.username === q) profile.value = user.value;
  else {
    try {
      const result = await $axios.get<UserProfileI>(
        `/user/info/profile?q=${q}`
      );
      profile.value = result.data;

      if (!profile.value.profileImage) {
        const name =
          `${profile.value.firstname} ${profile.value.lastname}`.replace(
            " ",
            "+"
          );
        profile.value.profileImage = `https://ui-avatars.com/api/?name=${name}&size=60&background=random&bold=true`;
      }
    } catch {
      profile.value = null;
    }
  }

  if (!profile.value) {
    useSeoMeta({
      title: `${q} not found | Conecta UNT`,
    });
    return;
  }

  useSeoMeta({
    title: `${profile.value.username} (${profile.value.firstname} ${profile.value.lastname}) | Conecta UNT`,
  });

  data.major = profile.value.major || undefined;
  data.area = profile.value.area || undefined;
  data.bio = profile.value.bio || undefined;
};

watch(user, async () => {
  await getUserProfile();
});
</script>

<template>
  <NuxtLayout name="app">
    <div v-if="user && profile">
      <section class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div
            class="flex items-center justify-center rounded-full outline-1 outline-black overflow-hidden"
          >
            <img
              :src="profile.profileImage || undefined"
              width="60"
              alt="Foto de perfil"
            />
          </div>
          <div>
            <h1 class="text-2xl">
              {{ profile.firstname }} {{ profile.lastname }}
            </h1>
            <p>@{{ profile.username }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <p>
            Cuenta de
            <span class="text-(--c-text-2)">{{ roles[profile.role] }}</span>
          </p>
          <template v-if="!isEditing">
            <p v-if="profile.major">
              <span class="font-extrabold">Carrera:</span> {{ profile.major }}
            </p>

            <p v-if="profile.area">
              <span
                v-if="profile.role === 'bussines_client'"
                class="font-extrabold"
              >
                Rubro:
              </span>
              <span v-else class="font-extrabold">Especialidad:</span>
              {{ profile.area }}
            </p>

            <p v-if="profile.bio">
              {{ profile.bio }}
            </p>
          </template>
        </div>

        <div v-if="isEditing" class="flex flex-col gap-4">
          <InputText
            v-if="profile.role !== 'bussines_client'"
            v-model="data.major"
            label="Carrera"
            class="max-w-md"
            :schema="majorSchema"
          />
          <InputText
            v-model="data.area"
            :label="
              profile.role === 'bussines_client' ? 'Rubro' : 'Especialidad'
            "
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
        <div v-if="user.username === profile.username">
          <Button v-show="!isEditing" @click="isEditing = true">
            <Icon name="mdi:pencil" /> Editar perfil
          </Button>
          <Button v-show="isEditing" @click="edit" :disabled="!isValidData">
            <Icon name="mdi:content-save" /> Guardar
          </Button>
        </div>
      </section>
    </div>
    <div v-else-if="profile === null">
      <section class="flex justify-center w-full">
        <p class="text-3xl text-center">Usuario no encontrado</p>
      </section>
    </div>
  </NuxtLayout>
</template>
