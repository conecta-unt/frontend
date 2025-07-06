<script setup lang="ts">
interface Props {
  id?: string;
  label?: string;
  name?: string;
}
const props = defineProps<Props>();

const id = props.id ? props.id : useId();
</script>

<template>
  <!-- Outer -->
  <div class="flex flex-col w-full gap-0.5">
    <!-- Wrapper -->
    <div class="flex flex-col w-full gap-1">
      <!-- Label -->
      <div v-if="$slots.label">
        <slot name="label">
          <label v-if="label" :for="id" class="text-black">{{ label }}</label>
        </slot>
      </div>

      <!-- Inner -->
      <div class="flex flex-col w-full gap-0.5">
        <!-- Prefix Icon -->
        <div v-if="$slots.prefixIcon">
          <slot name="prefixIcon" />
        </div>

        <!-- Prefix -->
        <div v-if="$slots.prefix">
          <slot name="prefix" />
        </div>

        <!-- Input -->
        <!-- Se te ocurrio q podemos tener un input por defecto,
        y pasarle argumentos como el schema etc, y hacer aqui las
        respectivas validaciones y estilado -->
        <!-- A partir de esto, se puede crear otros componentes con lógica adicional -->
        <div v-if="$slots.default">
          <slot />
        </div>

        <!-- Sufix -->
        <div v-if="$slots.sufix">
          <slot name="sufix" />
        </div>

        <!-- Sufix Icon -->
        <div v-if="$slots.sufixIcon">
          <slot name="sufixIcon" />
        </div>
      </div>
    </div>

    <!-- Help -->
    <div v-if="$slots.help">
      <slot name="help" />
    </div>

    <!-- Message -->
    <div v-if="$slots.errorMessage" class="mb-2">
      <slot name="errorMessage" />
    </div>
  </div>
</template>
