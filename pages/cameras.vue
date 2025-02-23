<script setup>
import { useCameraStore } from "@/stores/cameraStore";

// Use store
const cameraStore = useCameraStore();

// Fetch cameras when the component loads
cameraStore.fetchCameras();
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Buttons -->
    <div class="flex justify-start gap-2">
      <button @click="cameraStore.setFilter('all')" class="w-16 border-2 rounded-md">All</button>
      <button @click="cameraStore.setFilter('online')" class="w-16 border-2 rounded-md">Online</button>
      <a href="/" class="w-16 border-2 rounded-md text-center">Home</a>
    </div>

    <!-- Camera List -->
    <div class="w-auto flex flex-col justify-between border-2 rounded-sm">
      <p v-if="cameraStore.loading" class="text-center p-4">Loading cameras...</p>
      <p v-if="cameraStore.error" class="text-center p-4 text-red-500">Error loading cameras.</p>

      <template v-else>
        <div v-for="camera in cameraStore.filteredImages" :key="camera.id" class="border-b-2">
          <!-- Offline Cameras -->
          <div v-if="camera.status !== 'online'" class="grid grid-cols-3 place-items-center min-h-14">
            <h1>{{ camera.name }}</h1>
            <h1>{{ camera.status }}</h1>
            <p>Camera is offline</p>
          </div>

          <!-- Online Cameras -->
          <div v-else class="grid grid-cols-3 place-items-center">
            <h1>{{ camera.name }}</h1>
            <h1>{{ camera.status }}</h1>
            <a :href="`https://media.evercam.io/v2/cameras/${camera.id}/live/snapshot`">
              <img :src="camera.src" alt="camera image" width="200px" />
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
