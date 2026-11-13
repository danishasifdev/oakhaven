<script setup lang="ts">
import { deliveredDevelopments } from "../data/record";
import Eyebrow from "./Eyebrow.vue";

type ColumnKey =
  | "name"
  | "location"
  | "homes"
  | "promised"
  | "delivered"
  | "earlyBy";

type Column = { key: ColumnKey; label: string; tone?: "muted" | "sand" };

const columns: Column[] = [
  { key: "name", label: "Development" },
  { key: "location", label: "Location", tone: "muted" },
  { key: "homes", label: "Homes" },
  { key: "promised", label: "Promised" },
  { key: "delivered", label: "Delivered" },
  { key: "earlyBy", label: "Early by", tone: "sand" },
];
const bodyColumns = columns.slice(1);

const detailRows: Column[] = [
  { key: "homes", label: "Homes" },
  { key: "promised", label: "Promised" },
  { key: "delivered", label: "Delivered" },
  { key: "earlyBy", label: "Early by", tone: "sand" },
];

const toneClass = { muted: "text-muted", sand: "text-sand" } as const;
</script>

<template>
  <div class="grid gap-4 md:hidden">
    <article
      v-for="item in deliveredDevelopments"
      :key="item.number"
      class="border border-ivory/10 bg-raised p-5"
    >
      <Eyebrow>
        {{ String(item.number).padStart(2, "0") }} · {{ item.location }}
      </Eyebrow>
      <h3 class="mt-2 font-display text-3xl">{{ item.name }}</h3>
      <dl class="mt-4 grid grid-cols-2 gap-y-2 text-sm">
        <template v-for="row in detailRows" :key="row.key">
          <dt class="text-muted">{{ row.label }}</dt>
          <dd :class="row.tone ? toneClass[row.tone] : ''">
            {{ item[row.key] }}
          </dd>
        </template>
      </dl>
    </article>
  </div>
  <div class="hidden overflow-x-auto md:block">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr
          class="border-b border-ivory/20 text-xs uppercase tracking-wider text-muted"
        >
          <th
            v-for="column in columns"
            :key="column.key"
            class="py-4 pr-4 font-normal last:pr-0"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in deliveredDevelopments"
          :key="item.number"
          class="border-b border-ivory/10"
        >
          <th scope="row" class="py-4 pr-4 font-normal">{{ item.name }}</th>
          <td
            v-for="column in bodyColumns"
            :key="column.key"
            class="py-4 pr-4 last:pr-0"
            :class="column.tone ? toneClass[column.tone] : ''"
          >
            {{ item[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
