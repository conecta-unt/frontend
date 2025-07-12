<script setup lang="ts">
import { NuxtLink } from "#components";

interface Props {
  disabled?: boolean;
  isLoading?: boolean;
  to?: string;
}
defineProps<Props>();
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    v-bind="$attrs"
    class="flex items-center justify-center p-2 gap-4 outline-none rounded-3xl"
    :class="{
      'cursor-not-allowed bg-(--c-brand-disabled)': disabled || isLoading,
      'cursor-pointer bg-(--c-brand)': !disabled || !isLoading,
    }"
    :disabled="disabled || isLoading"
  >
    <Icon v-if="isLoading" name="mdi:refresh" class="animate-spin w-6 h-6" />
    <slot />
  </component>
</template>
