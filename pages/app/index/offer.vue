<script setup lang="ts">
import type { OfferDetalledI } from "~/types/offer";

defineProps<OfferDetalledI>();
</script>

<template>
  <div class="flex flex-col gap-4 shadow-md p-4 rounded-2xl">
    <div class="">
      <NuxtLink
        :to="`/app/perfil?user=${user.username}`"
        class="text-blue-500 underline"
      >
        @{{ user.username }}
      </NuxtLink>
      <p>
        {{ user.role === "bussines_client" ? "Empresa" : "Cliente" }}:
        {{ user.profile.firstname }} {{ user.profile.lastname }}
      </p>
      <p>
        Tipo de oferta:
        <span
          class="text-sm px-3 py-1 rounded-full font-medium"
          :class="{
            'bg-blue-100 text-blue-700': type === 'internship',
            'bg-green-100 text-green-700': type === 'project',
            'bg-yellow-100 text-yellow-700': type === 'advisory',
          }"
        >
          {{
            type === "internship"
              ? "Pasantía"
              : type === "project"
              ? "Proyecto"
              : "Asesoría"
          }}
        </span>
      </p>

      <span class="text-xs text-gray-400">
        {{ new Date(createdAt).toLocaleDateString() }}
      </span>
    </div>

    <div class="relative overflow-hidden text-ellipsis">
      <p class="clamp-3">
        {{ description }}
      </p>
    </div>

    <div class="flex text-gray-500 mt-auto gap-6">
      <span>
        Supervisor:
        <span :class="supervisorRequired ? 'text-green-600' : 'text-red-500'">
          {{ supervisorRequired ? "Sí" : "No" }}
        </span>
      </span>

      <span>
        En equipo:
        <span :class="team ? 'text-green-600' : 'text-red-500'">
          {{ team ? "Sí" : "No" }}
        </span>
      </span>
    </div>

    <Button :to="`/app/postular/${id}`" class="bg-(--c-brand)/60">
      <Icon name="mdi:send" />
      Postular
    </Button>
  </div>
</template>
