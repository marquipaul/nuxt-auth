<template>
  <UApp :toaster="{ position: 'top-right' }">
    <nav class="h-14 px-10 flex items-center justify-between">
      <div class="text-lg font-bold">My App</div>
      <AuthState class="flex items-center">
        <template #default="{ loggedIn }">
          <UButton v-if="loggedIn" @click="logout()">Logout</UButton>
          <div v-else>
            <NuxtLink to="/auth/login" class="mr-4">Login</NuxtLink>
            <NuxtLink to="/auth/register">Register</NuxtLink>
          </div>
        </template>
      </AuthState>
    </nav>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout> 
  </UApp>
</template>
<script setup lang="ts">
const { clear } = useUserSession();

const logout = async () => {
  await clear();
  await navigateTo('/auth/login');
};
</script>
