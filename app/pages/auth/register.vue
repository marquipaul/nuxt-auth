<template>
  <div class="max-w-md mx-auto p-10">
    <h1 class="text-center mb-10">Register</h1>
    <UForm class="flex flex-col gap-4" :schema="schema" :state="state" @submit="onRegister">
      <UFormField name="name" label="Name">
        <UInput class="w-full" v-model="state.name" placeholder="Enter your name" required />
      </UFormField>
      <UFormField name="email" label="Email">
        <UInput class="w-full" v-model="state.email" type="email" placeholder="Enter your email" required />
      </UFormField>
      <UFormField name="password" label="Password">
        <UInput class="w-full" v-model="state.password" type="password" placeholder="Enter your password" required />
      </UFormField>
      <UFormField name="passwordConfirm" label="Confirm Password">
        <UInput class="w-full" v-model="state.passwordConfirm" type="password" placeholder="Confirm your password" required />
      </UFormField>
      <UButton type="submit" :loading="loading" label="Register" />
      <p class="text-xs text-center">OR</p>
      <UButton leading-icon="ph:github-logo-duotone" @click="onGithub()">
        Register with Github
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});
import type { FormSubmitEvent } from '@/nuxt/ui';
import { z } from 'zod/v4';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  passwordConfirm: z.string()
}).check((data) => {
  if (data.value.password !== data.value.passwordConfirm) {
    data.issues.push({
      code: 'custom',
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
      input: data.value.passwordConfirm
    })
  }
})

type Schema = z.output<typeof schema>;

const state = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const loading = ref(false);
const toast = useToast();

const onRegister = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  const { name, email, password } = event.data;

  // Simulate a login request
  try {
    // Here you would typically make an API call to log in the user
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });

    if (!response.success) {
      throw new Error("Registration failed");
    }

    await navigateTo('/');
    // Redirect or show success message
  } catch (error) {
    toast.add({
      color: 'error',
      title: 'Failed to create account',
      description: 'Please check your details and try again.'
    })
  } finally {
    loading.value = false;
  }
}

const onGithub = async () => {
  window.location.href = '/oauth/github';
}
</script>

<style lang="scss" scoped>

</style>