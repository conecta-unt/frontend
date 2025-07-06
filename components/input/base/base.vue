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
  focusInput,
  onfocusin,
  onfocusout,
} = useInputBase(props);
</script>

<template>
  <div>
    <div class="flex flex-col w-full gap-1">
      <slot name="label" :id="id">
        <label v-if="label" v-bind="labelProps" class="px-1" :for="id">
          {{ label }}
        </label>
      </slot>

      <div
        class="flex items-center gap-1 outline-1 outline-(--c-border) rounded-lg p-2 w-full cursor-text"
        :class="{
          'outline-(--c-border-hover)': isFocused,
          'outline-(--c-error)': error,
        }"
        @click="focusInput"
      >
        <div v-if="$slots.prefixIcon">
          <slot name="prefix-icon" />
        </div>

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

        <div v-if="$slots.suffixIcon">
          <slot name="suffix-icon" />
        </div>
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
