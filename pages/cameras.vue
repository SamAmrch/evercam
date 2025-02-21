<script setup>
import { ref, computed, watchEffect } from "vue";

// Fetch cameras using `useFetch()`
const { data: camerasData, pending: loading, error } = await useFetch("https://media.evercam.io/v2/public/cameras");

// Store cameras metadata
const camTable = ref([]);

// Watch for `camerasData` changes and populate `camTable`
watchEffect(() => {
  if (camerasData.value?.cameras) {
    camTable.value = camerasData.value.cameras.map((cam) => ({
      name: cam.name,
      id: cam.id,
      status: cam.status,
    }));
  }
});

// Fetch snapshots using `useAsyncData()`
const { data: imgSrc } = useAsyncData("snapshots", async () => {
  if (!camTable.value.length) return [];

  return camTable.value.map((cam) => ({
    stat: cam.status,
    name: cam.name,
    id: cam.id,
    src: `https://media.evercam.io/v2/cameras/${cam.id}/live/snapshot`, // Use direct URL instead
  }));
});

// Filter state
const filterStatus = ref("all");

// Computed property for filtered images
const filteredImages = computed(() => {
  if (filterStatus.value === "online") {
    return imgSrc.value?.filter((img) => img.stat === "online") || [];
  }
  return imgSrc.value || [];
});

// Update filter status
const setFilter = (status) => {
  filterStatus.value = status;
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Buttons -->
    <div class="flex justify-start gap-2">
      <button @click="setFilter('all')" class="w-16 border-2 rounded-md">All</button>
      <button @click="setFilter('online')" class="w-16 border-2 rounded-md">Online</button>
      <a href="/" class="w-16 border-2 rounded-md text-center">Home</a>
    </div>

    <!-- Camera List -->
    <div class="w-auto flex flex-col justify-between border-2 rounded-sm">
      <p v-if="loading" class="text-center p-4">Loading cameras...</p>
      <p v-if="error" class="text-center p-4 text-red-500">Error loading cameras.</p>

      <template v-else>
        <div v-for="img in filteredImages" :key="img.id" class="border-b-2">
          <!-- Offline Cameras -->
          <div v-if="img.stat !== 'online'" class="grid grid-cols-3 place-items-center min-h-14">
            <h1>{{ img.name }}</h1>
            <h1>{{ img.stat }}</h1>
            <p>Camera is offline</p>
          </div>

          <!-- Online Cameras -->
          <div v-else class="grid grid-cols-3 place-items-center">
            <h1>{{ img.name }}</h1>
            <h1>{{ img.stat }}</h1>
            <a :href="`https://media.evercam.io/v2/cameras/${img.id}/live/snapshot`">
              <img :src="img.src" alt="camera image" width="200px" />
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
