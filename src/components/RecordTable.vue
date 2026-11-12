<script setup lang="ts">
import { deliveredDevelopments } from "../data/record";
</script>

<template>
  <div class="grid gap-4 md:hidden">
    <article
      v-for="item in deliveredDevelopments"
      :key="item.number"
      class="border border-ivory/10 bg-raised p-5"
    >
      <p class="eyebrow">
        {{ String(item.number).padStart(2, "0") }} · {{ item.location }}
      </p>
      <h3 class="mt-2 font-display text-3xl">{{ item.name }}</h3>
      <dl class="mt-4 grid grid-cols-2 gap-y-2 text-sm">
        <dt class="text-muted">Homes</dt>
        <dd>{{ item.homes }}</dd>
        <dt class="text-muted">Promised</dt>
        <dd>{{ item.promised }}</dd>
        <dt class="text-muted">Delivered</dt>
        <dd>{{ item.delivered }}</dd>
        <dt class="text-muted">Early by</dt>
        <dd class="text-sand">{{ item.earlyBy }}</dd>
      </dl>
    </article>
  </div>
  <div class="hidden overflow-x-auto md:block">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr
          class="border-b border-ivory/20 text-xs uppercase tracking-wider text-muted"
        >
          <th class="py-4 pr-4 font-normal">Development</th>
          <th class="py-4 pr-4 font-normal">Location</th>
          <th class="py-4 pr-4 font-normal">Homes</th>
          <th class="py-4 pr-4 font-normal">Promised</th>
          <th class="py-4 pr-4 font-normal">Delivered</th>
          <th class="py-4 font-normal">Early by</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in deliveredDevelopments"
          :key="item.number"
          class="border-b border-ivory/10"
        >
          <th scope="row" class="py-4 pr-4 font-normal">{{ item.name }}</th>
          <td class="py-4 pr-4 text-muted">{{ item.location }}</td>
          <td class="py-4 pr-4">{{ item.homes }}</td>
          <td class="py-4 pr-4">{{ item.promised }}</td>
          <td class="py-4 pr-4">{{ item.delivered }}</td>
          <td class="py-4 text-sand">{{ item.earlyBy }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
