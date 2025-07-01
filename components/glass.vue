<template>
  <div class="Glass">
    <slot />
  </div>
</template>

<style scoped>
.Glass {
  background: rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  border: 1px solid rgba(255, 255, 255, 0.69);
}
</style>
