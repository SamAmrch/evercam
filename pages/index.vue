<script setup>
import { useRouter } from '#imports';
import { useCameraStore } from '@/stores/cameraStore';
import { onMounted, computed, ref } from 'vue';
import { useHead } from '#imports'

useHead({
  title: 'Welcome to Evercam' 
})

const router = useRouter();
const cameraStore = useCameraStore();
const bgImage = ref("");

// Function to randomly select an online camera background
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
  <v-container 
    className="h-screen flex justify-center items-center bg-cover bg-center scale-110" 
    style="height: 100vh"
    :style="{ backgroundImage: bgImage }">
    <v-card className="flex flex-col w-96 h-56 bg-white justify-center align-center gap-4 rounded-md" max-width="1000" elevation="6">
      <v-card-title className="text-center">Welcome to Evercam</v-card-title>

      <v-card-actions className="d-flex justify-center">
        <v-btn @click="goToPage('/login')" className="bg-red px-[3em] py-2 border-2 border-solid border-red-500 rounded-md">
          Login
        </v-btn>
      </v-card-actions>

      <v-card-actions className="d-flex justify-center">
        <v-btn @click="goToPage('/register')" className="bg-white px-[2.4em] py-2 border-2 border-solid rounded-md">
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
