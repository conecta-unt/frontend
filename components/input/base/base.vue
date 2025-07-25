<script setup lang="ts">
import { useInputBase, type InputBaseProps } from "./base.composable";

const props = defineProps<InputBaseProps>();

const {
  label,
  type,
  labelProps,
  inputProps,
  help,
  helpProps,
  errorProps,
  id,
  isFocused,
  error,
  onfocusin,
  onfocusout,
} = useInputBase(props);
</script>

<template>
  <div>
    <div v-bind="wrapperProps" class="flex flex-col w-full gap-1">
      <slot name="label" :id="id" :label="label" :labelProps="labelProps">
        <label v-if="label" v-bind="labelProps" class="px-1" :for="id">
          {{ label }}
        </label>
      </slot>

      <div
        class="flex items-center gap-1 outline-1 outline-(--c-border) rounded-lg p-2 w-full"
        :class="{
          'outline-(--c-border-hover)': isFocused,
          'outline-(--c-error)': error,
        }"
        v-bind="innerProps"
      >
        <slot name="prefix-icon" />

        <slot name="prefix" />

        <slot
          :type="type"
          ref="input"
          :id="id"
          @focusin="onfocusin"
          @focusout="onfocusout"
          :inputProps="inputProps"
        >
          <input
            v-bind="inputProps"
            ref="input"
            :id="id"
            :type="type"
            @focusin="onfocusin"
            @focusout="onfocusout"
            class="w-full outline-none"
          />
        </slot>

        <slot name="suffix" />

        <slot name="suffix-icon" />
      </div>
    </div>

    <slot name="help">
      <p v-if="help" v-bind="helpProps">{{ help }}</p>
    </slot>

    <slot name="error" :error="error">
      <p v-if="error" v-bind="errorProps" class="text-(--c-error)">
        {{ error }}
      </p>
    </slot>
  </div>
</template>
