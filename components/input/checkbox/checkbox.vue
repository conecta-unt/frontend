<script setup lang="ts"></script>

<template>
  <InputBase
    :wrapper-props="{ class: 'flex-row-reverse' }"
    :inner-props="{ class: '!w-auto' }"
    type="checkbox"
  >
    <template #label="{ id, label, labelProps }">
      <div class="w-full">
        <label v-if="label" v-bind="labelProps" class="px-1" :for="id">
          {{ label }}
        </label>
      </div>
    </template>
  </InputBase>
</template>
