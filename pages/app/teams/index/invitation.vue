<script setup lang="ts">
import type { InvitationI, UserI } from "~/types/invitations";

interface Props {
  invitation: InvitationI;
}
defineProps<Props>();

const getName = (user: UserI) => {
  return `${user.profile.firstname} ${user.profile.lastname}`;
};

const showDetails = ref(false);
</script>

<template>
  <div
    class="flex flex-col w-full flex-wrap outline-1 rounded-2xl overflow-hidden"
  >
    <div class="flex items-center py-2 px-4">
      <div class="flex-1">
        <h3>{{ invitation.team.name }}</h3>
        <p>
          Creador:
          {{
            getName(
              invitation.team.members.filter(
                (member) => member.role === "owner"
              )[0].user
            )
          }}
        </p>
      </div>

      <div class="flex items-center flex-col gap-1">
        <Button class="w-full">
          <Icon name="mdi:check" />
          Aceptar
        </Button>
        <Button class="w-full bg-red-500">
          <Icon name="mdi:close" />
          Rechazar
        </Button>
      </div>
    </div>

    <div
      class="flex items-center justify-center gap-4 w-full outline-1 cursor-pointer"
      @click="showDetails = !showDetails"
    >
      <p class="text-center">
        {{ showDetails ? "Ocultar detalles" : "Mostrar detalles" }}
      </p>

      <Icon v-show="showDetails" name="mdi:chevron-up" size="20" />
      <Icon v-show="!showDetails" name="mdi:chevron-down" size="20" />
    </div>

    <div v-show="showDetails" class="flex flex-col gap-4 py-2 px-4">
      <template v-for="(member, index) in invitation.team.members">
        <div class="flex flex-col">
          <p>@{{ member.user.username }}</p>
          <p>{{ getName(member.user) }}</p>
          <p>Confirmado: {{ member.confirmed ? "Sí" : "No" }}</p>
        </div>

        <Separator
          v-if="index != invitation.team.members.length - 1"
          bg-before="var(--c-primary)"
        />
      </template>
    </div>
  </div>
</template>
