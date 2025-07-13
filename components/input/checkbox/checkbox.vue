<script setup lang="ts">
const model = defineModel();
</script>

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

    <template #default="{ id, inputProps, onFocusin, onFocusout }">
      <input
        v-model="model"
        v-bind="{ id, ...inputProps, onFocusin, onFocusout }"
        class="w-full outline-none"
        type="checkbox"
      ></input>
    </template>
  </InputBase>
</template>
