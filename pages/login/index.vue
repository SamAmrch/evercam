<script setup>

import { ref } from 'vue'
import { useSupabaseClient, useRouter } from '#imports'

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref(null);

const login = async () => {
    try {
        const { user, data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        });
        if (error) throw error;

        // Redirect user after successful login
        router.push('/cameras');

    } catch (error) {
        errorMsg.value = error.message;
    }
}

</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-6" max-width="400" elevation="6">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-text class="w-64">
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            required
          />
          <v-btn type="submit" color="primary" block class="mt-3 d-flex justify-center">Login</v-btn>
        </v-form>
        <v-alert v-if="errorMsg" type="error" class="mt-3">{{ errorMsg }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
