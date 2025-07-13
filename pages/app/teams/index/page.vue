<script setup lang="ts">
import type { TeamI } from "~/types/team";
import Invitation from "./invitation.vue";

const { $axios } = useNuxtApp();

const invitations = useState<TeamI[]>();
const teams = useState<TeamI[]>();

const getInvitations = async () => {
  const result = await $axios.get("/team/invitations");
  invitations.value = result.data;
};

const getTeams = async () => {
  const result = await $axios.get("/team");
  teams.value = result.data;
};

const confirmInvitation = async (confirmed: boolean, teamId: number) => {
  await $axios.patch("/team/invitations/confirm", { confirmed, teamId });
  await getInvitations();
  await getTeams();
};

const acceptInvitation = async (teamId: number) => {
  await confirmInvitation(true, teamId);
};

const rejectInvitation = async (teamId: number) => {
  await confirmInvitation(false, teamId);
};

onMounted(async () => {
  if (!invitations.value) await getInvitations();
  if (!teams.value) await getTeams();
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

      <section
        v-if="invitations && invitations.length"
        class="flex flex-col w-full gap-4"
      >
        <h2 class="text-xl">Invitaciones pendientes</h2>

        <div
          v-for="invitation in invitations"
          :key="invitation.teamId"
          class="flex flex-col gap-4"
        >
          <Invitation
            @accept="acceptInvitation"
            @reject="rejectInvitation"
            :team="invitation"
          />
        </div>
      </section>

      <section v-if="teams && teams.length" class="flex flex-col w-full gap-4">
        <h2 class="text-xl">Equipos</h2>

        <div
          v-for="team in teams"
          :key="team.teamId"
          class="flex flex-col gap-4"
        >
          <Invitation :team="team" />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
