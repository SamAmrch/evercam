<script setup>

import { ref } from 'vue'
import { useSupabaseClient, useRouter } from '#imports'
import { useHead } from '#imports'

useHead({
  title: 'Login' 
})

const cameraStore = useCameraStore();
const bgImage = ref("");
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

        router.push('/cameras');

    } catch (error) {
        errorMsg.value = error.message;
    }
}

// Function to randomly select a camera
const getRandomOnlineCamera = () => {
  const onlineCameras = cameraStore.camTable.filter(cam => cam.status.toLowerCase() === "online");
  if (onlineCameras.length > 0) {
    const randomCam = onlineCameras[Math.floor(Math.random() * onlineCameras.length)];
    bgImage.value = `url(${randomCam.src})`;
  }
};

// Fetch cameras + set background
onMounted(async () => {
  await cameraStore.fetchCameras();
  getRandomOnlineCamera();
});

// Navigate to another page
const goToPage = (path) => {
  router.push(path);
};
</script>

<template>
  <v-container class="d-flex justify-center align-center scale-110" style="height: 100vh; background-position: center; background-size: cover;" :style="{ backgroundImage: bgImage }">
    <v-card class="pa-6 bg-white rounded-md" max-width="400" elevation="6">
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
          <v-btn type="submit" block class="mt-3 d-flex justify-center bg-red px-[3em] py-2 border-2 border-solid border-red-500 rounded-md">Login</v-btn>
          <v-card-actions className="d-flex justify-center pt-4" >
            <v-btn @click="goToPage('/')" block className="bg-white w-full py-2 border-2 border-solid border-red-500 rounded-md text-red" evaluation="6">
              Main Menu
            </v-btn>
          </v-card-actions>
        </v-form>
        <v-alert v-if="errorMsg" type="error" class="mt-3">{{ errorMsg }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
