<script setup>

import { ref } from 'vue'
import { useSupabaseClient, useRouter } from '#imports'

const client = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const successMsg = ref(null);
const errorMsg = ref(null);

async function signUp() {
    try {
        const { user, data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) throw error;
        successMsg.value = "Check your email to confirm your account!";
    } catch (error) {
        errorMsg.value = error.message;
    }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-6" max-width="400" elevation="6">
      <v-card-title class="text-h5 text-center">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="signUp">
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
          <v-btn type="submit" color="primary" block class="mt-3">Register</v-btn>
        </v-form>
        <v-alert v-if="successMsg" type="success" class="mt-3">{{ successMsg }}</v-alert>
        <v-alert v-if="errorMsg" type="error" class="mt-3">{{ errorMsg }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
