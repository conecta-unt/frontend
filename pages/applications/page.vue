<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { API_URL } from '~/config/api'

interface Postulacion {
  id: number
  type: string
  offer: {
    id: number
    type: string
    description: string
  }
  team: {
    id: number
    name: string
  }
  accepted: boolean | null
}

const postulaciones = ref<Postulacion[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const { $axios } = useNuxtApp()
    const { data } = await $axios.get('/postulation', {
      baseURL: API_URL,
    })
    postulaciones.value = data
  } catch (error) {
    console.error('Error al obtener postulaciones:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NuxtLayout name="app">
    <div class="max-w-5xl mx-auto mt-10 px-6">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-8">Mis postulaciones</h1>

      <div v-if="isLoading" class="text-gray-500 text-center">Cargando postulaciones...</div>

      <div v-else-if="postulaciones.length" class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="post in postulaciones"
          :key="post.id"
          class="bg-white border rounded-xl shadow-md p-5 transition hover:shadow-lg"
        >
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-semibold text-blue-700">
              {{ post.team.name }}
            </h2>
            <span
              class="text-xs px-2 py-1 rounded-full font-medium"
              :class="{
                'bg-blue-100 text-blue-600': post.accepted === null,
                'bg-green-100 text-green-600': post.accepted === true,
                'bg-red-100 text-red-600': post.accepted === false,
              }"
            >
              {{
                post.accepted === null
                  ? 'Pendiente'
                  : post.accepted
                  ? 'Aceptado'
                  : 'Rechazado'
              }}
            </span>
          </div>

          <p class="text-sm text-gray-600 mb-1">
            <span class="font-medium text-gray-800">Tipo de oferta:</span>
            {{ post.offer.type }}
          </p>

          <p class="text-sm text-gray-700">
            <span class="font-medium text-gray-800">Descripción:</span><br />
            {{ post.offer.description }}
          </p>
        </div>
      </div>

      <p v-else class="text-gray-500 text-center mt-10">No tienes postulaciones aún.</p>
    </div>
  </NuxtLayout>
</template>
