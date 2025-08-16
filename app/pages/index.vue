<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold">Welcome to Nuxt 4 Protected Page</h1>
    <p class="mt-4">This is your starter template.</p>
    <p class="mt-4">Hello {{ session.user.value.name }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['unauth']
});

const session = useUserSession();

</script>

<style lang="scss" scoped>

</style>