<script setup lang="ts">
import type { InvitationI } from "~/types/invitations";
import Invitation from "./invitation.vue";

const { $axios } = useNuxtApp();

const invitations = useState<InvitationI[]>();

const getInvitations = async () => {
  const result = await $axios.get("/team/invitations");
  invitations.value = result.data;
};

onMounted(async () => {
  if (!invitations.value) await getInvitations();
});
</script>

<template>
  <NuxtLayout name="app">
    <div class="flex flex-col gap-6">
      <section class="flex w-full justify-end md:px-6">
        <Button to="/app/equipos/crear">
          <Icon name="mdi:add" />
          Crear equipo
        </Button>
      </section>

      <Separator bgBefore="var(--c-primary)" />

      <section v-if="invitations" class="flex flex-col w-full gap-4">
        <h2 class="text-xl">Invitaciones pendientes</h2>

        <div
          v-for="invitation in invitations"
          :key="invitation.teamId"
          class="flex flex-col gap-4"
        >
          <Invitation :invitation="invitation" />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
