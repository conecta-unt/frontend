<script setup lang="ts">
import { ref, computed } from "vue";

// Rol hardcodeado (cambiar para probar diferentes vistas)
const role = ref("student"); // Posibles valores: 'individual_client', 'business_client', 'teacher', 'student'

const showOffersLink = computed(() => {
  return role.value === "individual_client" || role.value === "business_client";
});

const showApplicationsLink = computed(() => {
  return role.value === "teacher" || role.value === "student";
});

const isMobileMenuOpen = ref(false);
const isAvatarMenuOpen = ref(false);

const logout = () => {
  alert("Sesión cerrada");
  isAvatarMenuOpen.value = false;
};
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <NuxtLink to="/" class="logo"> Conecta UNT </NuxtLink>

        <!-- Desktop -->
        <nav class="desktop-nav">
          <ul>
            <li>
              <NuxtLink to="/">
                <Icon name="mdi:home" class="icon" />
                Inicio
              </NuxtLink>
            </li>
            <li v-if="showOffersLink">
              <NuxtLink to="/offers">
                <Icon name="mdi:briefcase" class="icon" />
                Mis ofertas
              </NuxtLink>
            </li>
            <li v-if="showApplicationsLink">
              <NuxtLink to="/applications">
                <Icon name="mdi:document" class="icon" />
                Mis postulaciones
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Avatar -->
        <div class="avatar-container">
          <button
            class="avatar-button"
            @click="isAvatarMenuOpen = !isAvatarMenuOpen"
            aria-label="Menú de usuario"
          >
            <div class="avatar-placeholder">
              <Icon name="mdi:user" class="avatar-icon" />
            </div>
          </button>

          <div v-if="isAvatarMenuOpen" class="avatar-dropdown">
            <NuxtLink to="/profile" @click="isAvatarMenuOpen = false">
              <Icon name="mdi:user" class="icon" />
              Perfil
            </NuxtLink>
            <button @click="logout">
              <Icon name="mdi:logout" class="icon" />
              Cerrar sesión
            </button>
          </div>
        </div>

        <!-- Botón de menú móvil -->
        <button
          class="mobile-menu-button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Menú de navegación"
        >
          <Icon
            :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
            class="menu-icon"
          />
        </button>
      </div>
    </header>

    <!-- Menú móvil -->
    <Transition name="slide">
      <nav v-if="isMobileMenuOpen" class="mobile-nav">
        <ul>
          <li @click="isMobileMenuOpen = false">
            <NuxtLink to="/">
              <Icon name="mdi:home" class="icon" />
              Inicio
            </NuxtLink>
          </li>
          <li v-if="showOffersLink" @click="isMobileMenuOpen = false">
            <NuxtLink to="/offers">
              <Icon name="mdi:briefcase" class="icon" />
              Mis ofertas
            </NuxtLink>
          </li>
          <li v-if="showApplicationsLink" @click="isMobileMenuOpen = false">
            <NuxtLink to="/applications">
              <Icon name="mdi:document" class="icon" />
              Mis postulaciones
            </NuxtLink>
          </li>
          <li @click="isMobileMenuOpen = false">
            <NuxtLink to="/profile">
              <Icon name="mdi:user" class="icon" />
              Perfil
            </NuxtLink>
          </li>
          <li
            @click="
              logout;
              isMobileMenuOpen = false;
            "
          >
            <button>
              <Icon name="mdi:logout" class="icon" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </Transition>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: var(--c-bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header {
  background-color: var(--c-surface);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.8rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--c-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo:hover {
  color: var(--c-highlight);
}

.desktop-nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.desktop-nav a {
  color: var(--c-text-2);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: var(--c-primary);
  background-color: var(--c-secondary);
}

.icon {
  font-size: 1.2rem;
}

.avatar-container {
  position: relative;
}

.avatar-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.avatar-button:hover {
  background-color: var(--c-secondary);
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--c-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 1.5rem;
  color: var(--c-primary);
}

.avatar-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  background-color: var(--c-surface);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  overflow: hidden;
  z-index: 10;
}

.avatar-dropdown a,
.avatar-dropdown button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  width: 100%;
  text-align: left;
  text-decoration: none;
  color: var(--c-text-2);
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.avatar-dropdown a:hover,
.avatar-dropdown button:hover {
  background-color: var(--c-secondary);
  color: var(--c-primary);
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  font-size: 1.8rem;
  color: var(--c-text);
}

.mobile-nav {
  display: none;
  background-color: var(--c-surface);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: -100%;
  left: 0;
  right: 0;
  z-index: 99;
}

.mobile-nav ul {
  list-style: none;
  margin: 0;
  padding: 1rem 0;
}

.mobile-nav li a,
.mobile-nav li button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  width: 100%;
  text-decoration: none;
  color: var(--c-text);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1.1rem;
}

.mobile-nav li button {
  color: var(--c-error);
}

.mobile-nav li a:hover,
.mobile-nav li button:hover {
  background-color: var(--c-secondary);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}

.main-content {
  padding: 2rem 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .avatar-container {
    margin-left: auto;
    margin-right: 1rem;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1.2rem;
  }

  .avatar-placeholder {
    width: 36px;
    height: 36px;
  }
}
</style>
