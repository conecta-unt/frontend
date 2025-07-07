<script setup lang="ts">
import type { UserProfileI } from "~/types/user";

const user = useState<UserProfileI>("user");

const roles: any = {
  individual_client: "Cliente Independiente",
  bussines_client: "Empresa",
  teacher: "Docente",
  student: "Estudiante",
};

watch(user, () => {
  useSeoMeta({
    title: `${user.value.username} (${user.value.firsname} ${user.value.lastname}) | Conecta UNT`,
  });
});
</script>

<template>
  <NuxtLayout name="app">
    <div class="flex md:flex-row flex-col">
      <section class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <div class="avatar" aria-label="Menú de usuario">
            <div class="avatar-placeholder">
              <NuxtImg
                v-if="user.profileImage"
                :src="user.profileImage"
                alt="Foto de perfil"
              />
              <Icon v-else name="mdi:user" class="avatar-icon" />
            </div>
          </div>

          <div class="flex flex-col">
            <h1>{{ user.firsname }} {{ user.lastname }}</h1>
            <p>@{{ user.username }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <p>
            Correo: <br /><span class="font-bold">{{ user.email }}</span>
          </p>

          <p class="role-badge">Cuenta de {{ roles[user.role] }}</p>
        </div>
      </section>

      <section class="flex flex-col flex-1">
        <!-- <div class="py-4 px-4">content</div> -->
      </section>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.avatar {
  border-radius: 50%;
}

.avatar-placeholder {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--c-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
