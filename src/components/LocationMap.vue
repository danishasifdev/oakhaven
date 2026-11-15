<script setup lang="ts">
import { computed } from "vue";
import { gulfMap } from "../data/gulfMap";
import { locations } from "../data/locations";

withDefaults(
  defineProps<{ markers?: boolean; fit?: "meet" | "slice"; active?: string }>(),
  {
    markers: true,
    fit: "meet",
  },
);

// The geometry is generated from Natural Earth 1:50m country outlines, so the
// map stays sharp at every size instead of upscaling a small raster.
const scale = gulfMap.height / (gulfMap.bounds.latMax - gulfMap.bounds.latMin);
const lonScale =
  Math.cos(
    ((gulfMap.bounds.latMin + gulfMap.bounds.latMax) / 2) * (Math.PI / 180),
  ) * scale;

// Markers are HTML rather than SVG circles so they keep a readable, constant
// screen size on a phone instead of shrinking with the viewBox.
const points = computed(() =>
  locations.map((location) => ({
    name: location.name,
    label: `${location.name}, ${location.region}: ${location.status}`,
    left: `${(((location.coords[0] - gulfMap.bounds.lonMin) * lonScale) / gulfMap.width) * 100}%`,
    top: `${(((gulfMap.bounds.latMax - location.coords[1]) * scale) / gulfMap.height) * 100}%`,
  })),
);
</script>

<template>
  <div :class="markers ? 'relative' : undefined">
    <svg
      :viewBox="`0 0 ${gulfMap.width} ${gulfMap.height}`"
      :preserveAspectRatio="`xMidYMid ${fit}`"
      aria-hidden="true"
      class="absolute inset-0 size-full select-none"
    >
      <g class="fill-ivory/[0.07] stroke-sand/25" stroke-width="1">
        <path
          v-for="(path, index) in gulfMap.paths"
          :key="index"
          :d="path"
          vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
    <div v-if="markers" class="pointer-events-none absolute inset-0">
      <span
        v-for="point in points"
        :key="point.name"
        role="img"
        :aria-label="point.label"
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :style="{ left: point.left, top: point.top }"
      >
        <span
          aria-hidden="true"
          class="block size-5 rounded-full transition-all duration-300"
          :class="
            active === point.name
              ? 'scale-150 bg-sand/25'
              : 'scale-100 bg-sand/15'
          "
        />
        <span
          aria-hidden="true"
          class="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_2px_rgba(184,169,149,0.8)] transition-colors duration-300"
          :class="active === point.name ? 'bg-ivory' : 'bg-sand'"
        />
      </span>
    </div>
  </div>
</template>
