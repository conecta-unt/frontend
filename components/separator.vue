<script setup lang="ts">
interface Props {
  bg?: string;
  bgBefore?: string;
}
withDefaults(defineProps<Props>(), {
  bg: "var(--c-bg)",
  bgBefore: "var(--c-bg)",
});
</script>

<template>
  <div class="Separator">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.Separator {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
}

.Separator .content {
  display: inline-block;
  position: relative;
  padding: 0 0.7rem;
  background-color: v-bind(bg);
}

.Separator::before {
  content: "";
  height: 1px;
  background-color: v-bind(bgBefore);
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
}
</style>
