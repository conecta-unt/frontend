<script setup lang="ts">
interface Props {
  disabled?: boolean;
}
defineProps<Props>();
</script>

<template>
  <button
    class="flex items-center justify-center p-2 gap-4 outline-none rounded-3xl"
    :class="{
      'cursor-not-allowed bg-(--c-brand-disabled)': disabled,
      'cursor-pointer bg-(--c-brand)': !disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
