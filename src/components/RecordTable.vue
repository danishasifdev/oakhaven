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
const index = (number: number) => String(number).padStart(2, "0");
</script>

<template>
  <div class="grid gap-5 md:hidden">
    <article
      v-for="item in deliveredDevelopments"
      :key="item.number"
      class="group overflow-hidden border border-ivory/10 bg-raised"
    >
      <div class="relative aspect-[16/9] overflow-hidden">
        <img
          :src="item.image"
          :alt="`${item.name}, ${item.location}`"
          loading="lazy"
          class="size-full object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-raised via-raised/25 to-transparent"
        />
        <span
          class="absolute left-5 top-4 font-display text-3xl text-ivory/60"
          aria-hidden="true"
          >{{ index(item.number) }}</span
        >
        <div class="absolute inset-x-5 bottom-4">
          <Eyebrow tone="sand">{{ item.location }}</Eyebrow>
          <h3 class="mt-1 font-display text-3xl font-light">{{ item.name }}</h3>
        </div>
      </div>
      <dl class="grid grid-cols-2 gap-x-5 gap-y-3 px-5 py-5 text-sm">
        <template v-for="row in detailRows" :key="row.key">
          <dt class="text-muted">{{ row.label }}</dt>
          <dd class="text-right" :class="row.tone ? toneClass[row.tone] : ''">
            {{ item[row.key] }}
          </dd>
        </template>
      </dl>
    </article>
  </div>

  <div class="hidden md:block">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr
          class="border-b border-ivory/20 text-[10px] uppercase tracking-[0.2em] text-muted"
        >
          <th
            v-for="column in columns"
            :key="column.key"
            class="pb-4 pr-4 font-normal last:pr-0"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in deliveredDevelopments"
          :key="item.number"
          class="group border-b border-ivory/10 transition-colors hover:bg-ivory/[0.03]"
        >
          <th scope="row" class="py-4 pr-4 font-normal">
            <span class="flex items-center gap-4">
              <span class="font-display text-lg text-muted" aria-hidden="true">{{
                index(item.number)
              }}</span>
              <span class="h-10 w-14 shrink-0 overflow-hidden">
                <img
                  :src="item.image"
                  alt=""
                  loading="lazy"
                  class="size-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
              <span class="font-display text-xl font-light">{{ item.name }}</span>
            </span>
          </th>
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
