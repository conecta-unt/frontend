<script setup lang="ts"></script>

<template>
  <NuxtLayout name="landing">
    <template #presentation>
      <h1 class="text-(--c-bg) text-4xl text-center">¿Quiénes somos?</h1>
      <h2 class="text-(--c-bg) text-lg text-center">
        Descubre más sobre nuestro proyecto y equipo
      </h2>
    </template>

    <section class="w-full px-4 py-10 bg-(--c-bg) flex justify-center">
      <div
        class="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl w-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <!-- Historia -->
        <div class="md:w-1/2 w-full h-64 md:h-auto">
          <NuxtImg
            src="/images/about-us_historia.jpg"
            alt="Historia"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="md:w-1/2 w-full p-6 flex flex-col justify-center">
          <h2 class="text-2xl font-bold text-gray-800">
            Historia de Conecta UNT
          </h2>
          <div class="w-16 h-1 bg-(--c-brand) my-2 rounded"></div>
          <p class="text-gray-600 mb-4">
            Conecta UNT surgió en 2025 como un proyecto estudiantil innovador en
            la Universidad Nacional de Trujillo (UNT).
          </p>
          <p class="text-gray-600">
            Conecta UNT nació con la visión de crear un espacio digital donde
            estudiantes y docentes pudieran interactuar directamente con
            empresas, organizaciones y clientes externos, fomentando así la
            colaboración activa en proyectos reales y relevantes para el entorno
            productivo regional y nacional.
          </p>
        </div>
      </div>
    </section>

    <section class="w-full px-4 py-10 bg-(--c-bg) flex justify-center">
      <div
        class="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl w-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <!-- Proposito -->
        <div class="md:w-1/2 w-full h-64 md:h-auto">
          <NuxtImg
            src="/images/about-us_proposito.jpg"
            alt="Historia"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="md:w-1/2 w-full p-6 flex flex-col justify-center">
          <h2 class="text-2xl font-bold text-gray-800">
            Propósito del Proyecto
          </h2>
          <div class="w-16 h-1 bg-(--c-brand) my-2 rounded"></div>
          <p class="text-gray-600 mb-4">
            El propósito principal de Conecta UNT es desarrollar una aplicación
            web que facilite la conexión entre estudiantes y profesores de la
            UNT con clientes externos, startups, emprendimientos y empresas
            consolidadas.
          </p>
          <p class="text-gray-600">
            A través de esta plataforma, se busca impulsar el desarrollo de
            productos, asesorías, investigaciones aplicadas y servicios en
            distintas áreas del conocimiento.
          </p>
        </div>
      </div>
    </section>

    <section class="w-full px-4 py-10 bg-(--c-bg) flex justify-center">
      <div
        class="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl w-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <!-- Ventajas -->
        <div class="md:w-1/2 w-full h-64 md:h-auto">
          <NuxtImg
            src="/images/about-us_ventajas.jpg"
            alt="Historia"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="md:w-1/2 w-full p-6 flex flex-col justify-center">
          <h2 class="text-2xl font-bold text-gray-800">
            Ventajas del Proyecto
          </h2>
          <div class="w-16 h-1 bg-(--c-brand) my-2 rounded"></div>
          <ul class="list-disc pl-5 text-gray-600 space-y-2">
            <li>
              Participación en proyectos reales: estudiantes y docentes aplican
              conocimientos académicos en situaciones prácticas y concretas.
            </li>
            <li>
              Creación de un portafolio profesional: cada proyecto realizado se
              documenta y puede incorporarse como evidencia del talento y la
              experiencia adquirida.
            </li>
            <li>
              Conexión con empresas y docentes: la plataforma facilita el
              contacto directo con profesionales, mentores y organizaciones
              interesadas en soluciones innovadoras.
            </li>
            <li>
              Desarrollo de habilidades prácticas: los participantes fortalecen
              competencias técnicas, de liderazgo, comunicación y trabajo en
              equipo.
            </li>
            <li>
              Reconocimiento y certificación: al finalizar proyectos, los
              usuarios obtienen constancias que validan su participación y
              aportan valor a su trayectoria profesional.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="w-full px-4 py-10 bg-(--c-bg) flex justify-center">
      <div
        class="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl w-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <!-- Equipo -->
        <div class="md:w-1/2 w-full h-64 md:h-auto">
          <NuxtImg
            src="/images/about-us_equipo.jpg"
            alt="Historia"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="md:w-1/2 w-full p-6 flex flex-col justify-center">
          <h2 class="text-2xl font-bold text-gray-800">Nuestro Equipo</h2>
          <div class="w-16 h-1 bg-(--c-brand) my-2 rounded"></div>
          <p class="text-gray-600 mb-4">
            Nuestro equipo está conformado por estudiantes de la escuela
            profesional de ingeniería informática del 7mo ciclo.
          </p>
          <p class="text-gray-600">
            Creemos en el trabajo colaborativo, la responsabilidad social y la
            mejora continua como los pilares que sostienen Conecta UNT. Nuestra
            meta es seguir creciendo y consolidar este proyecto como un
            referente de vinculación universidad–empresa en la región y el país.
          </p>
        </div>
      </div>
    </section>

    <section class="w-full px-4 py-10 bg-(--c-bg) flex text-center">
      <div class="max-w-2xl mx-auto space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold">
          ¿Listo para conectar con oportunidades?
        </h2>
        <p class="text-lg">
          Únete a nuestra comunidad y descubre todo lo que Conecta UNT tiene
          para ofrecerte
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
