<script setup lang="ts">
import OportunityCard from "~/pages/oportunities/cards.vue";

const oportunidades = [
  {
    titulo: "Práctica Profesional - Desarrollo Web",
    tipo: "Prácticas",
    badgeColor: "bg-green-500",
    empresaLogo: "/images/about-us_equipo.jpg",
    empresaNombre: "TechSolutions Perú",
    descripcion:
      "Buscamos estudiantes de Ingeniería de Sistemas o carreras afines para realizar prácticas profesionales en desarrollo web utilizando tecnologías modernas.",
    ubicacion: "Trujillo",
    duracion: "3 meses",
    remuneracion: "S/. 1,200 mensual",
  },
  {
    titulo: "Asistente Administrativo - Media Jornada",
    tipo: "Empleo Part-time",
    badgeColor: "bg-blue-500",
    empresaLogo: "/images/about-us_equipo.jpg",
    empresaNombre: "Consultora Financiera Moche",
    descripcion:
      "Oportunidad para estudiantes de Administración o Contabilidad para trabajar 20 horas semanales apoyando en tareas administrativas y financieras.",
    ubicacion: "Trujillo",
    duracion: "3 meses",
    remuneracion: "S/. 930 mensual",
  },
  {
    titulo: "Voluntariado en Campaña de Salud",
    tipo: "Voluntariado",
    badgeColor: "bg-violet-500",
    empresaLogo: "/images/about-us_equipo.jpg",
    empresaNombre: "Fundación Salud para Todos",
    descripcion:
      "Buscamos estudiantes de Medicina, Enfermería y Nutrición para participar en campañas de salud en zonas rurales de La Libertad.",
    ubicacion: "Trujillo",
    duracion: "Fines de semana (2 meses)",
    remuneracion: "S/. 1,200 mensual",
  },
  {
    titulo: "Asistente de Investigación - Biodiversidad",
    tipo: "Investigación",
    badgeColor: "bg-gray-500",
    empresaLogo: "/images/about-us_equipo.jpg",
    empresaNombre: "Instituto de Biodiversidad Regional",
    descripcion:
      "Oportunidad para estudiantes de Biología o Ciencias Ambientales para participar en proyecto de investigación sobre biodiversidad en ecosistemas costeros.",
    ubicacion: "Laboratorio UNT y trabajo de campo",
    duracion: "6 meses",
    remuneracion: "Beca de investigación",
  },
  {
    titulo: "Proyecto de Digitalización de Patrimonio Cultural",
    tipo: "Proyecto",
    badgeColor: "bg-orange-500",
    empresaLogo: "/images/about-us_equipo.jpg",
    empresaNombre: "Museo de Arte Moderno de Trujillo",
    descripcion:
      "Buscamos estudiantes de Historia del Arte, Arqueología o Humanidades para colaborar en un proyecto de digitalización del patrimonio cultural de Trujillo.",
    ubicacion: "Centro Histórico de Trujillo",
    duracion: "4 meses",
    remuneracion: "Créditos académicos y experiencia profesional",
  },
  {
    titulo: "Práctica en Ingeniería Civil - Diseño Estructural",
    tipo: "Prácticas",
    empresaLogo: "/images/about-us_equipo.jpg",
    empresaNombre: "Constructora Los Portales",
    descripcion:
      "Oportunidad para estudiantes de los últimos ciclos de Ingeniería Civil para realizar prácticas en el área de diseño estructural.",
    ubicacion: "Trujillo",
    duracion: "6 meses",
    remuneracion: "S/. 1,500 mensual",
  },
];
</script>

<template>
  <NuxtLayout name="landing">
    <template #presentation>
      <h1 class="text-(--c-bg) text-4xl text-center">
        Oportunidades Disponibles
      </h1>
      <h2 class="text-(--c-bg) text-lg text-center">
        Explora las mejores oportunidades para estudiantes universitarios
      </h2>
    </template>

    <section class="py-16 px-4 bg-(--c-bg) flex justify-center">
      <div class="max-w-7xl w-full flex flex-wrap justify-center gap-6">
        <OportunityCard
          v-for="(item, i) in oportunidades"
          :key="i"
          v-bind="item"
        />
      </div>
    </section>

    <section class="w-full px-4 py-10 bg-(--c-bg) flex text-center">
      <div class="max-w-2xl mx-auto space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold">
          ¿Eres una empresa y quieres publicar oportunidades?
        </h2>
        <p class="text-lg">
          Contacta con el mejor talento universitario de la UNT
        </p>
        <NuxtLink
          to="/auth/registrate"
          class="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-lg px-6 py-3 rounded-lg transition"
        >
          Regístrate ahora
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>
