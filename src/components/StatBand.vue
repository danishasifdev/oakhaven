<script setup lang="ts">
import { computed } from "vue";

// Shared summary strip for the record, developments and about pages: one row
// of oversized figures over a hairline, stacking on small screens.
const props = withDefaults(
  defineProps<{
    items: ReadonlyArray<{ value: string; label: string; note?: string }>;
    columns?: 3 | 4;
  }>(),
  { columns: 3 },
);

const gridClass = computed(() =>
  props.columns === 4
    ? "sm:grid-cols-2 lg:grid-cols-4"
    : "sm:grid-cols-3",
);

// Keep the dividing hairlines between cells, never before the first cell of a
// wrapped row.
const cellClass = (index: number) => {
  if (props.columns === 4)
    return [
      index % 2 === 1 ? "sm:border-l sm:border-ivory/15 sm:pl-8" : "",
      index % 4 !== 0 ? "lg:border-l lg:border-ivory/15 lg:pl-8" : "",
    ]
      .filter(Boolean)
      .join(" ");
  return index % 3 !== 0 ? "sm:border-l sm:border-ivory/15 sm:pl-8" : "";
};
</script>

<template>
  <dl
    class="grid gap-8 border-y border-ivory/15 py-8"
    :class="gridClass"
  >
    <div
      v-for="(item, index) in items"
      :key="item.label"
      class="flex flex-col"
      :class="cellClass(index)"
    >
      <dt class="order-2 mt-2 text-xs text-muted">{{ item.label }}</dt>
      <dd class="order-1 font-display text-4xl font-light md:text-5xl">
        {{ item.value }}
      </dd>
      <dd v-if="item.note" class="order-3 mt-1 text-[10px] text-muted">
        {{ item.note }}
      </dd>
    </div>
  </dl>
</template>
