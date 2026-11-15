<script setup lang="ts">
import { computed, ref } from "vue";
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import Eyebrow from "../components/Eyebrow.vue";
import FormField from "../components/FormField.vue";
import { projects } from "../data/projects";
import { team } from "../data/team";
import ScrollReveal from "../components/ScrollReveal.vue";

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "project"
  | "preferredDay"
  | "message";

type Field = {
  key: FieldKey;
  label: string;
  as: "input" | "select" | "textarea";
  type?: string;
  autocomplete?: string;
  rows?: number;
  min?: string;
  wide?: boolean;
};

const sent = ref(false);
const attempted = ref(false);
const errors = ref<Record<string, string>>({});
const form = ref({
  name: "",
  email: "",
  phone: "",
  project: "",
  preferredDay: "",
  message: "",
});
const minimumDate = new Date().toISOString().slice(0, 10);
const ownerCareLead = computed(() =>
  team.find((person) => person.name === "Dana Cheung"),
);

const heroMeta = [
  { label: "Sales gallery", value: "Palm Jumeirah" },
  { label: "Opening hours", value: "Mon–Sat · 10–18" },
  { label: "Customer care", value: "Through year two" },
];

const contactBlocks: ReadonlyArray<{
  label: string;
  lines?: readonly string[];
  links?: ReadonlyArray<{ label: string; href: string }>;
  note?: string;
}> = [
  {
    label: "Sales gallery",
    lines: ["Oakhaven Sales Gallery", "Palm Jumeirah, Dubai, UAE"],
    note: "Concept address; fictional contact details.",
  },
  {
    label: "Enquiries",
    links: [
      {
        label: "hello@oakhaven.example",
        href: "mailto:hello@oakhaven.example",
      },
      { label: "+971 00 000 0000", href: "tel:+971000000000" },
    ],
  },
  {
    label: "Opening hours",
    lines: ["Monday–Saturday", "10:00–18:00"],
  },
];

const fields: Field[] = [
  { key: "name", label: "Name", as: "input", autocomplete: "name" },
  {
    key: "email",
    label: "Email",
    as: "input",
    type: "email",
    autocomplete: "email",
  },
  {
    key: "phone",
    label: "Phone",
    as: "input",
    type: "tel",
    autocomplete: "tel",
  },
  { key: "project", label: "Interested development", as: "select" },
  {
    key: "preferredDay",
    label: "Preferred day",
    as: "input",
    type: "date",
    min: minimumDate,
  },
  { key: "message", label: "Message", as: "textarea", rows: 4, wide: true },
];

const validate = () => {
  const nextErrors: Record<string, string> = {};
  if (!form.value.name.trim()) nextErrors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    nextErrors.email = "Enter a valid email address.";
  if (!form.value.phone.trim()) nextErrors.phone = "Enter your phone number.";
  if (!form.value.project) nextErrors.project = "Choose a development.";
  if (!form.value.preferredDay || form.value.preferredDay < minimumDate)
    nextErrors.preferredDay = "Choose a day from today onward.";
  if (!form.value.message.trim()) nextErrors.message = "Add a message.";
  errors.value = nextErrors;
  return Object.keys(nextErrors).length === 0;
};

const submit = () => {
  attempted.value = true;
  sent.value = validate();
};
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="Request a private viewing."
      lead="A named advisor, a set time, and a straight answer on the handover date."
      image="/img/skyline.avif"
      image-alt="Concept image of the Dubai skyline at dusk"
      image-position="object-[50%_60%]"
      :meta="heroMeta"
    />

    <AppContainer
      as="section"
      class="grid gap-14 py-20 md:grid-cols-12 md:gap-10 md:py-28"
    >
      <aside class="space-y-8 text-sm leading-relaxed md:col-span-4">
        <article
          v-for="block in contactBlocks"
          :key="block.label"
          class="border-t border-ivory/15 pt-5"
        >
          <Eyebrow>{{ block.label }}</Eyebrow>
          <div v-if="block.lines" class="mt-3 space-y-1 text-ivory/85">
            <p v-for="line in block.lines" :key="line">{{ line }}</p>
          </div>
          <div v-if="block.links" class="mt-1">
            <a
              v-for="link in block.links"
              :key="link.href"
              class="flex min-h-11 items-center text-muted transition-colors hover:text-ivory"
              :href="link.href"
              >{{ link.label }}</a
            >
          </div>
          <p v-if="block.note" class="mt-3 text-xs text-muted">
            {{ block.note }}
          </p>
        </article>

        <div
          id="customer-care"
          class="border border-ivory/10 bg-raised p-5 md:p-6"
        >
          <Eyebrow>Already an owner?</Eyebrow>
          <div class="mt-4 flex items-center gap-4">
            <ScrollReveal mask :delay="0.08">
              <img
                v-if="ownerCareLead"
                :src="ownerCareLead.image"
                alt=""
                loading="lazy"
                class="size-14 shrink-0 object-cover grayscale"
              />
            </ScrollReveal>
            <div>
              <p class="font-display text-xl font-light">Customer care</p>
              <p class="mt-1 text-xs text-muted">{{ ownerCareLead?.name }}</p>
            </div>
          </div>
          <p class="mt-4 text-xs leading-relaxed text-muted">
            A named contact from signing through year two.
          </p>
          <a
            class="mt-4 inline-flex min-h-11 items-center border-b border-sand text-sand transition-colors hover:text-ivory"
            href="mailto:hello@oakhaven.example?subject=Customer%20care"
          >
            Contact customer care →
          </a>
        </div>
      </aside>

      <form
        class="border border-ivory/10 bg-raised p-6 md:col-span-7 md:col-start-6 md:p-10"
        novalidate
        @submit.prevent="submit"
      >
        <div class="border-b border-ivory/10 pb-6">
          <Eyebrow class="mb-3">Private viewing</Eyebrow>
          <h2 class="font-display text-3xl font-light md:text-4xl">
            Tell us where to meet you.
          </h2>
          <p class="mt-3 max-w-md text-xs leading-relaxed text-muted">
            We reply with a time, an advisor, and the current construction
            report.
          </p>
        </div>

        <div class="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
          <div
            v-for="field in fields"
            :key="field.key"
            :class="field.wide ? 'sm:col-span-2' : ''"
          >
            <FormField
              :id="field.key"
              v-model="form[field.key]"
              :label="field.label"
              :as="field.as"
              :type="field.type"
              :autocomplete="field.autocomplete"
              :rows="field.rows"
              :min="field.min"
              :name="field.key"
              :error="attempted ? errors[field.key] : undefined"
              required
              @blur="attempted && validate()"
            >
              <template v-if="field.as === 'select'">
                <option value="" disabled>Select a development</option>
                <option
                  v-for="project in projects"
                  :key="project.slug"
                  :value="project.name"
                >
                  {{ project.name }}
                </option>
              </template>
            </FormField>
          </div>
        </div>

        <div
          class="mt-8 flex flex-wrap items-center gap-6 border-t border-ivory/10 pt-6"
        >
          <AppButton type="submit">Request a viewing</AppButton>
          <p v-if="sent" role="status" class="text-sm text-sand">
            Thank you. Your viewing request has been noted.
          </p>
        </div>
        <p class="mt-5 text-xs text-muted">
          Fictional concept contact details. This form does not send data to a
          service.
        </p>
      </form>
    </AppContainer>
  </div>
</template>
