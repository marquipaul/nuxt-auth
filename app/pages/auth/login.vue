<template>
  <div class="max-w-md mx-auto p-10">
    <h1 class="text-center mb-10">Login</h1>
    <UForm class="flex flex-col gap-4" :schema="schema" :state="state" @submit="onLogin">
      <UFormField name="email" label="Email">
        <UInput class="w-full" v-model="state.email" type="email" placeholder="Enter your email" required />
      </UFormField>
      <UFormField name="password" label="Password">
        <UInput class="w-full" v-model="state.password" type="password" placeholder="Enter your password" required />
      </UFormField>
      <UButton type="submit" label="Log In" />
      <p class="text-xs text-center">OR</p>
      <UButton leading-icon="ph:github-logo-duotone" @click="onGithub()">
        Login with Github
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
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: '',
  password: ''
})

const loading = ref(false);
const toast = useToast();

const onLogin = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true;
  const { email, password } = event.data;

  // Simulate a login request
  try {
    // Here you would typically make an API call to log in the user
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    });

    if (!response.success) {
      throw new Error("Login failed");
    }

    await navigateTo('/');
    // Redirect or show success message
  } catch (error) {
    toast.add({
      color: 'error',
      title: 'Failed to login account',
      description: 'Please check your details and try again.',
      position: 'top-right'
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