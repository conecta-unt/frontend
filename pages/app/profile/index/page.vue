<script setup lang="ts">
import { z } from "zod/v4";
import { areaSchema, bioSchema, majorSchema } from "~/schemas";
import type { UserProfileI } from "~/types/user";

const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

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

const fileInput = useTemplateRef("file-input");
const file = ref<File>();
const isUploading = ref(false);
const uploadError = ref<string | null>(null);

const handleOpenFileSelector = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const uploadProfileImage = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append("file", file.value);

  isUploading.value = true;
  uploadError.value = null;

  try {
    const res = await $axios.post("/user/profile/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Imagen subida:", res.data);
  } catch (error: any) {
    const msg = error.response?.data?.message || "Error al subir la imagen";
    console.error("❌", msg);
    uploadError.value = msg;
  } finally {
    isUploading.value = false;
  }
};

watch(file, async (newFile) => {
  if (!newFile) return;

  const reader = new FileReader();

  if (newFile.size > MAX_SIZE_BYTES) {
    alert(`El archivo supera los ${MAX_SIZE_MB} MB.`);
    return;
  }

  reader.onload = async () => {
    if (profile.value) {
      profile.value.profileImage = reader.result as string;
      await uploadProfileImage();
    }
  };

  reader.onerror = () => {
    console.error("Error al leer el archivo");
  };

  reader.readAsDataURL(newFile);
});

watch([user, route], async () => {
  await getUserProfile();
});

onMounted(async () => {
  await getUserProfile();
});
</script>

<template>
  <NuxtLayout name="app">
    <div v-if="user && profile">
      <section class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div
            class="ProfileImage flex items-center justify-center rounded-full outline-1 outline-black overflow-hidden relative"
          >
            <img
              :src="profile.profileImage || undefined"
              width="60"
              class="aspect-square object-cover rounded-full"
              alt="Foto de perfil"
            />
            <div
              class="absolute top-[-100%] lef-0 w-full h-full flex items-center justify-center bg-gray-700 cursor-pointer"
              @click="handleOpenFileSelector"
            >
              <Icon name="mdi:camera" class="text-white" />
            </div>
            <input
              @change="(e) => (file = e.target?.files?.[0])"
              hidden
              ref="file-input"
              type="file"
              name="file"
              accept=".png, .jpg, .jpeg, .webp"
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

<style scoped lang="css">
.ProfileImage div {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.ProfileImage:hover div {
  transform: translateY(100%);
}
</style>
