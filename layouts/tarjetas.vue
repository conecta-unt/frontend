<script setup lang="ts">
defineProps({
  titulo: String,
  tipo: String,
  empresaLogo: String,
  empresaNombre: String,
  descripcion: String,
  ubicacion: String,
  duracion: String,
  remuneracion: String,
  badgeColor: {
    type: String,
    default: 'bg-green-500',
  },
});
</script>

<template>
  <div class="flex flex-col bg-white rounded-2xl shadow-md w-full sm:w-[47%] lg:w-[31%] hover:-translate-y-1 hover:shadow-lg transition duration-300">
    <div class="px-6 py-4 flex justify-between items-start">
      <div class="font-extrabold text-xl text-gray-900 leading-snug">
        {{ titulo }}
      </div>
      <span :class="`${badgeColor} text-white text-xs font-medium px-3 py-1 rounded-full`">
        {{ tipo }}
      </span>

    </div>

    <div class="px-6 py-3 flex items-center gap-3 border-t border-gray-200">
      <img :src="empresaLogo" alt="Empresa" class="w-8 h-8 rounded-full object-cover" />
      <span class="text-gray-700 text-sm">{{ empresaNombre }}</span>
    </div>

    <div class="px-6 py-4 text-gray-700 text-sm leading-relaxed border-t border-gray-200">
      {{ descripcion }}
    </div>

    <div class="px-6 py-4 text-sm space-y-1 text-gray-800">
      <p><span class="font-semibold">Ubicación:</span> {{ ubicacion }}</p>
      <p><span class="font-semibold">Duración:</span> {{ duracion }}</p>
      <p><span class="font-semibold">Remuneración:</span> {{ remuneracion }}</p>
    </div>

    <div class="px-6 py-4">
      <NuxtLink
        to="/aplicar"
        class="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-lg transition"
      >
        Aplicar
      </NuxtLink>
    </div>
  </div>
</template>
