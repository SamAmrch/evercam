<script setup>
import { useRouter } from '#imports';
import { RouterLink } from 'vue-router';

const router = useRouter();

// Function to navigate to the selected page
const goToPage = (path) => {
  router.push(path);
};
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-6" max-width="400" elevation="6">
      <v-card-title class="text-center">Welcome</v-card-title>

      <v-card-actions class="d-flex justify-center">
        <v-btn @click="goToPage('/login')" variant="outlined" color="primary">Login</v-btn>
      </v-card-actions>

      <v-card-actions class="d-flex justify-center">
        <v-btn @click="goToPage('/register')" variant="outlined" color="secondary">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
