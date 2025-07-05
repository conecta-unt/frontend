<script setup lang="ts">
import axios from "axios";
import { API_URL } from "~/config/api";

interface Props {
  label: string;
  urlPath: string;
  name?: string;
}
const props = defineProps<Props>();

const id = useId();
const model = defineModel({ type: String, default: "" });
const isAvailableValue = ref(false);

const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const fetchIsAvailable = async (value: string) => {
  if (!value) {
    isAvailableValue.value = false;
    return;
  }

  try {
    const response = await axios.get<boolean>(
      `${API_URL}${props.urlPath}?q=${value}`
    );
    isAvailableValue.value = !response.data;
  } catch (error) {
    console.error("Error checking availability:", error);
    isAvailableValue.value = false;
  }
};

const debouncedFetch = (value: string) => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = setTimeout(() => {
    fetchIsAvailable(value);
  }, 500);
};

watch(model, (newValue) => {
  debouncedFetch(newValue);
});

onUnmounted(() => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }
});
</script>

<template>
  <FormInputBase>
    <template #label>
      <label :for="id" class="text-white">{{ label }}</label>
    </template>

    <input
      v-model="model"
      type="text"
      :name="name"
      :id="id"
      class="outline-1 outline-white rounded-lg text-white p-2 w-full focus:outline-(--c-brand)"
    />

    <p v-if="model && isAvailableValue">
      El nombre de usuario no está disponible.
    </p>
  </FormInputBase>
</template>
