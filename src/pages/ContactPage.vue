<script setup lang="ts">
import { computed, ref } from "vue";
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import FormField from "../components/FormField.vue";
import { projects } from "../data/projects";
import { team } from "../data/team";

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
  { key: "message", label: "Message", as: "textarea", rows: 4 },
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
    <PageHero eyebrow="Contact" title="Request a private viewing." />
    <AppContainer
      as="section"
      class="grid gap-14 pb-20 md:grid-cols-12 md:pb-32"
    >
      <aside class="space-y-8 text-sm leading-relaxed md:col-span-4">
        <div>
          <h2 class="text-ivory">Sales gallery</h2>
          <p class="mt-2 text-muted">
            Oakhaven Sales Gallery<br />Palm Jumeirah, Dubai, UAE
          </p>
          <p class="mt-2 text-xs text-muted">
            Concept address; fictional contact details.
          </p>
        </div>
        <div>
          <h2 class="text-ivory">Enquiries</h2>
          <a
            class="mt-2 flex min-h-11 items-center text-muted"
            href="mailto:hello@oakhaven.example"
            >hello@oakhaven.example</a
          >
          <a
            class="flex min-h-11 items-center text-muted"
            href="tel:+971000000000"
            >+971 00 000 0000</a
          >
        </div>
        <div>
          <h2 class="text-ivory">Opening hours</h2>
          <p class="mt-2 text-muted">Monday–Saturday, 10:00–18:00</p>
        </div>
        <div id="customer-care" class="border-t border-ivory/15 pt-6">
          <h2 class="font-display text-2xl">Already an owner?</h2>
          <p class="mt-2 text-muted">Customer care · {{ ownerCareLead?.name }}</p>
          <a
            class="mt-2 inline-flex min-h-11 items-center border-b border-sand text-sand"
            href="mailto:hello@oakhaven.example?subject=Customer%20care"
          >
            Contact customer care
          </a>
        </div>
      </aside>

      <form
        class="grid gap-7 md:col-span-7 md:col-start-6"
        novalidate
        @submit.prevent="submit"
      >
        <FormField
          v-for="field in fields"
          :key="field.key"
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
          <option value="" disabled>Select a development</option>
          <option
            v-for="project in projects"
            :key="project.slug"
            :value="project.name"
          >
            {{ project.name }}
          </option>
        </FormField>

        <AppButton type="submit" class="justify-self-start">
          Request a viewing
        </AppButton>
        <p v-if="sent" role="status" class="text-sm text-sand">
          Thank you. Your viewing request has been noted.
        </p>
        <p class="text-xs text-muted">
          Fictional concept contact details. This form does not send data to a
          service.
        </p>
      </form>
    </AppContainer>
  </div>
</template>
