<script setup>
import { ref, watchEffect } from "vue";
import { useSupabaseUser, useRouter } from "#imports";
import { useCameraStore } from "@/stores/cameraStore";
import { useHead } from '#imports'

useHead({
  title: 'Camera List' 
})


definePageMeta({
  middleware: "auth", 
  layout: "default",
});

const cameraStore = useCameraStore();
cameraStore.fetchCameras();
const user = useSupabaseUser();
const router = useRouter();

// Redirect to login if user is not logged in
watchEffect(() => {
  if (!user.value) {
    router.push("/login");
  }
});


// Track the selected tab
const selectedTab = ref("all");

// Handle tab change
const handleTabChange = (tab) => {
  selectedTab.value = tab;
  cameraStore.setFilter(tab);
};
</script>

<template>
  <v-container class="px-0 py-0" v-if="user">
    <!-- Tabs for Filtering -->
    <v-tabs v-model="selectedTab" class="py-0" color=" bg-blue-darken-1" grow="true">
      <v-tab value="all" @click="handleTabChange('all')">All</v-tab>
      <v-tab value="online" @click="handleTabChange('online')">Online</v-tab>
    </v-tabs>

    <!-- Camera List -->
    <v-card elevation="2" class="mt-2 rounded-0">
      <v-container>
        <!-- Loading and Error Messages -->
        <v-alert v-if="cameraStore.loading" type="info" class="text-center">Loading cameras...</v-alert>
        <v-alert v-if="cameraStore.error" type="error" class="text-center">Error loading cameras.</v-alert>

        <template v-else>
          <v-list>
            <v-list-item v-for="camera in cameraStore.filteredImages" :key="camera.id" class="border-b">
              <v-row align="center">
                <!-- Camera Name & Status -->
                <v-col cols="10">
                  <h3>{{ camera.name }}</h3>
                  <v-chip :color="camera.status === 'online' ? 'green' : 'red'" class="mt-1">
                    {{ camera.status }}
                  </v-chip>
                </v-col>

                <!-- Camera Image or Offline Message -->
                <v-col cols="0" class="text-center">
                  <template v-if="camera.status === 'online'">
                    <a :href="`https://media.evercam.io/v2/cameras/${camera.id}/live/snapshot`">
                      <v-img :src="camera.src" alt="camera image" max-width="200px" />
                    </a>
                  </template>
                  <template v-else>
                    <p>Camera is offline</p>
                  </template>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </template>
      </v-container>
    </v-card>
  </v-container>
</template>
