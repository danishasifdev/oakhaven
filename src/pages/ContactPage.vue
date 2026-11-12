<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import { projects } from '../data/projects'
import { team } from '../data/team'

const sent = ref(false)
const attempted = ref(false)
const errors = ref<Record<string, string>>({})
const form = ref({
  name: '',
  email: '',
  phone: '',
  project: '',
  preferredDay: '',
  message: '',
})
const minimumDate = new Date().toISOString().slice(0, 10)
const ownerCareLead = computed(() => team.find((person) => person.name === 'Dana Cheung'))

const validate = () => {
  const nextErrors: Record<string, string> = {}
  if (!form.value.name.trim()) nextErrors.name = 'Enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) nextErrors.email = 'Enter a valid email address.'
  if (!form.value.phone.trim()) nextErrors.phone = 'Enter your phone number.'
  if (!form.value.project) nextErrors.project = 'Choose a development.'
  if (!form.value.preferredDay || form.value.preferredDay < minimumDate) nextErrors.preferredDay = 'Choose a day from today onward.'
  if (!form.value.message.trim()) nextErrors.message = 'Add a message.'
  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

const submit = () => {
  attempted.value = true
  sent.value = validate()
}

const fieldClass = 'form-field'
</script>

<template>
  <div>
    <PageHero eyebrow="Contact" title="Request a private viewing." />
    <section class="mx-auto grid w-full max-w-[90rem] gap-14 px-6 pb-20 md:grid-cols-12 md:px-12 md:pb-32">
    <aside class="space-y-8 text-sm leading-relaxed md:col-span-4">
      <div>
        <h2 class="text-ivory">Sales gallery</h2>
        <p class="mt-2 text-muted">VÉRÉN Sales Gallery<br />Palm Jumeirah, Dubai, UAE</p>
        <p class="mt-2 text-xs text-muted">Concept address; fictional contact details.</p>
      </div>
      <div>
        <h2 class="text-ivory">Enquiries</h2>
        <a class="mt-2 flex min-h-11 items-center text-muted" href="mailto:hello@veren.example">hello@veren.example</a>
        <a class="flex min-h-11 items-center text-muted" href="tel:+971000000000">+971 00 000 0000</a>
      </div>
      <div>
        <h2 class="text-ivory">Opening hours</h2>
        <p class="mt-2 text-muted">Monday–Saturday, 10:00–18:00</p>
      </div>
      <div id="customer-care" class="border-t border-ivory/15 pt-6">
        <h2 class="font-display text-2xl">Already an owner?</h2>
        <p class="mt-2 text-muted">Customer care · {{ ownerCareLead?.name }}</p>
        <a class="mt-2 inline-flex min-h-11 items-center border-b border-sand text-sand" href="mailto:hello@veren.example?subject=Customer%20care">
          Contact customer care
        </a>
      </div>
    </aside>

    <form class="grid gap-7 md:col-span-7 md:col-start-6" novalidate @submit.prevent="submit">
      <label class="grid gap-2 text-xs text-muted">
        Name
        <input v-model="form.name" required name="name" autocomplete="name" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'name-error' : undefined" :class="fieldClass" @blur="attempted && validate()" />
        <span v-if="attempted && errors.name" id="name-error" class="text-xs text-sand">{{ errors.name }}</span>
      </label>
      <label class="grid gap-2 text-xs text-muted">
        Email
        <input v-model="form.email" required type="email" name="email" autocomplete="email" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'email-error' : undefined" :class="fieldClass" @blur="attempted && validate()" />
        <span v-if="attempted && errors.email" id="email-error" class="text-xs text-sand">{{ errors.email }}</span>
      </label>
      <label class="grid gap-2 text-xs text-muted">
        Phone
        <input v-model="form.phone" required type="tel" name="phone" autocomplete="tel" :aria-invalid="!!errors.phone" :aria-describedby="errors.phone ? 'phone-error' : undefined" :class="fieldClass" @blur="attempted && validate()" />
        <span v-if="attempted && errors.phone" id="phone-error" class="text-xs text-sand">{{ errors.phone }}</span>
      </label>
      <label class="grid gap-2 text-xs text-muted">
        Interested development
        <select v-model="form.project" required name="project" :aria-invalid="!!errors.project" :aria-describedby="errors.project ? 'project-error' : undefined" :class="fieldClass" @blur="attempted && validate()">
          <option value="" disabled>Select a development</option>
          <option v-for="project in projects" :key="project.slug" :value="project.name">{{ project.name }}</option>
        </select>
        <span v-if="attempted && errors.project" id="project-error" class="text-xs text-sand">{{ errors.project }}</span>
      </label>
      <label class="grid gap-2 text-xs text-muted">
        Preferred day
        <input v-model="form.preferredDay" required type="date" name="preferredDay" :min="minimumDate" :aria-invalid="!!errors.preferredDay" :aria-describedby="errors.preferredDay ? 'date-error' : undefined" :class="fieldClass" @blur="attempted && validate()" />
        <span v-if="attempted && errors.preferredDay" id="date-error" class="text-xs text-sand">{{ errors.preferredDay }}</span>
      </label>
      <label class="grid gap-2 text-xs text-muted">
        Message
        <textarea v-model="form.message" required name="message" rows="4" :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'message-error' : undefined" :class="fieldClass" @blur="attempted && validate()" />
        <span v-if="attempted && errors.message" id="message-error" class="text-xs text-sand">{{ errors.message }}</span>
      </label>
      <button type="submit" class="min-h-11 justify-self-start border border-sand px-7 text-xs uppercase tracking-[0.18em] text-sand transition-colors hover:bg-sand hover:text-ink">
        Request a viewing
      </button>
      <p v-if="sent" role="status" class="text-sm text-sand">Thank you. Your viewing request has been noted.</p>
      <p class="text-xs text-muted">Fictional concept contact details. This form does not send data to a service.</p>
    </form>
    </section>
  </div>
</template>
