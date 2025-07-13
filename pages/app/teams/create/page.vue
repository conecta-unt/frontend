<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { z } from "zod/v4";

useSeoMeta({ title: "Crea a tu equipo | Conecta UNT" });

interface Usuario {
  id: number;
  username: string;
  firstname: string;
  lasname: string;
  profileImage: string;
  role: string;
  teamRole?: string;
}
const { $axios } = useNuxtApp();

const teamName = ref("");
const searchUsername = ref("");
const userResults = ref<Usuario[]>([]);
const members = ref<Usuario[]>([]);
const formErrors = ref<string[]>([]);
const isSearching = ref(false);

const teamNameSchema = z
  .string()
  .min(3, "El nombre del equipo debe tener al menos 3 caracteres.")
  .max(20, "El nombre del equipo debe tener máximo 20 caracteres.");

const buscarUsuarios = async () => {
  const query = searchUsername.value.trim().toLowerCase();
  if (!query) {
    userResults.value = [];
    return;
  }
  isSearching.value = true;
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/team/filter/user", {
      params: { user: query },
    });
    userResults.value = response.data.filter(
      (user: Usuario) => !members.value.some((m) => m.id === user.id)
    );
  } catch (err: any) {
    console.error("Error real:", err.response?.data || err);
    formErrors.value.push("Ocurrió un error al buscar usuarios.");
  } finally {
    isSearching.value = false;
  }
};

watch(
  searchUsername,
  useDebounceFn(() => {
    buscarUsuarios();
  }, 400)
);

const agregarMiembro = (user: Usuario) => {
  const yaExiste = members.value.some((m) => m.id === user.id);
  if (!yaExiste) {
    const nuevoMiembro = {
      ...user,
      teamRole: user.role === "teacher" ? "supervisor" : "colaborator",
    };
    members.value.push(nuevoMiembro);
    searchUsername.value = "";
    userResults.value = [];
  }
};

const cambiarRol = (id: number, nuevoRol: string) => {
  const miembro = members.value.find((m) => m.id === id);
  if (miembro) {
    miembro.teamRole = nuevoRol;
  }
};

const eliminarMiembro = (id: number) => {
  members.value = members.value.filter((m) => m.id !== id);
};

const crearEquipo = async () => {
  formErrors.value = [];

  const validName = teamNameSchema.safeParse(teamName.value);
  if (!validName.success) {
    formErrors.value.push(validName.error.issues[0].message);
  }

  if (members.value.length === 0) {
    formErrors.value.push("Debes agregar al menos un miembro al equipo.");
  }

  if (formErrors.value.length === 0) {
    try {
      await $axios.post("/team/create", {
        name: teamName.value,
        members: members.value.map((m) => ({
          id: m.id,
          role: m.teamRole || "colaborator",
        })),
      });
      alert(`Equipo "${teamName.value}" creado.`);
      teamName.value = "";
      searchUsername.value = "";
      members.value = [];
    } catch (err: any) {
      console.error("Error al crear el equipo:", err.response?.data || err);
      formErrors.value.push("Ocurrió un error al crear el equipo.");
    }
  }
};
</script>

<template>
  <NuxtLayout name="app">
    <div
      class="w-full max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
    >
      <h1 class="text-3xl font-extrabold text-gray-800 mb-6">
        Crea a tu equipo
      </h1>
      <label class="block mb-1 text-gray-700 font-bold">
        Nombre del equipo
      </label>
      <InputText
        v-model="teamName"
        :schema="teamNameSchema"
        placeholder="Ej: Los innovadores"
      />

      <label class="block mt-4 mb-1 text-gray-700 font-bold">
        Agregar miembro (@username)
      </label>
      <div class="relative">
        <input
          v-model="searchUsername"
          type="text"
          placeholder="Buscar usuario..."
          class="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul
        v-if="searchUsername.trim() && userResults.length"
        class="border mt-3 rounded-lg divide-y bg-white shadow-md overflow-hidden"
      >
        <li
          v-for="user in userResults"
          :key="user.id"
          class="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-all"
        >
          <img
            :src="user.profileImage"
            alt="Avatar"
            class="w-10 h-10 rounded-full object-cover border bg-gray-100"
          />
          <div class="flex-1">
            <p class="font-bold text-gray-800">
              {{ user.firstname }} {{ user.lasname }}
            </p>
            <p class="text-sm text-gray-500">
              @{{ user.username }}
              <span v-if="user.role" class="ml-1 font-medium text-blue-600">
                • {{ user.role === "teacher" ? "Docente" : "Estudiante" }}
              </span>
            </p>
          </div>
          <button
            @click="agregarMiembro(user)"
            class="text-sm font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            Agregar
          </button>
        </li>
      </ul>

      <div v-if="members.length" class="mt-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">
          Miembros agregados
        </h3>
        <TransitionGroup
          name="fade"
          tag="div"
          class="grid gap-4 sm:grid-cols-2"
        >
          <div
            v-for="miembro in members"
            :key="miembro.id"
            class="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 shadow-sm"
          >
            <img
              :src="miembro.profileImage"
              alt="Avatar"
              class="w-12 h-12 rounded-full object-cover border bg-gray-100"
            />

            <div class="flex-1">
              <p class="font-bold text-gray-800 leading-tight">
                {{ miembro.firstname }} {{ miembro.lasname }}
              </p>
              <p class="text-xs text-gray-500">
                @{{ miembro.username }}
                <span
                  v-if="miembro.role"
                  class="ml-1 font-medium text-blue-600"
                >
                  • {{ miembro.role === "teacher" ? "Docente" : "Estudiante" }}
                </span>
              </p>
              <div v-if="miembro.role === 'teacher'" class="mt-1">
                <label class="text-xs font-medium text-gray-600">
                  Rol en el equipo:
                </label>
                <select
                  v-model="miembro.teamRole"
                  @change="
                    cambiarRol(miembro.id, miembro.teamRole || 'colaborator')
                  "
                  class="text-xs border rounded px-2 py-1 ml-2"
                >
                  <option value="supervisor">Supervisor</option>
                  <option value="colaborator">Colaborador</option>
                </select>
              </div>
              <div v-else class="text-xs text-gray-500 mt-1">
                Rol en el equipo: Colaborador
              </div>
            </div>

            <button
              @click="eliminarMiembro(miembro.id)"
              class="text-red-500 hover:text-red-700 text-xl leading-none cursor-pointer"
              title="Eliminar"
            >
              &times;
            </button>
          </div>
        </TransitionGroup>
      </div>

      <ul
        v-if="formErrors.length"
        class="mt-5 text-red-600 text-sm list-disc list-inside bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <li v-for="err in formErrors" :key="err">{{ err }}</li>
      </ul>

      <button
        @click="crearEquipo"
        class="mt-6 bg-yellow-300 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 w-full transition shadow-lg flex justify-center items-center gap-2 font-bold"
      >
        Crear equipo
      </button>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
