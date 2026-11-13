<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    error?: string;
    as?: "input" | "select" | "textarea";
    type?: string;
    autocomplete?: string;
    rows?: number;
    min?: string;
  }>(),
  { as: "input" },
);

const model = defineModel<string>({ default: "" });
const attrs = useAttrs();
const describedBy = computed(() =>
  props.error ? `${props.id}-error` : undefined,
);
const controlClass =
  "min-h-11 w-full border-0 border-b border-ivory/25 bg-transparent px-0 py-3 text-sm text-ivory outline-none transition-colors focus:border-sand aria-[invalid=true]:border-sand";
</script>

<template>
  <label :for="id" class="grid gap-2 text-xs text-muted">
    {{ label }}
    <textarea
      v-if="as === 'textarea'"
      :id="id"
      v-model="model"
      v-bind="attrs"
      :rows="rows"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      :class="[controlClass, 'resize-y']"
    />
    <select
      v-else-if="as === 'select'"
      :id="id"
      v-model="model"
      v-bind="attrs"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      :class="controlClass"
    >
      <slot />
    </select>
    <input
      v-else
      :id="id"
      v-model="model"
      v-bind="attrs"
      :type="type"
      :autocomplete="autocomplete"
      :min="min"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      :class="controlClass"
    />
    <span v-if="error" :id="`${id}-error`" class="text-xs text-sand">
      {{ error }}
    </span>
  </label>
</template>
