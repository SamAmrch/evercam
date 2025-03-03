<script setup>
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useRouter } from 'vue-router' // ✅ Import useRouter

const client = useSupabaseClient();
const user = useSupabaseUser(); // Tracks logged-in user
const router = useRouter(); // ✅ Initialize router

const links = [
  { name: 'Cameras', href: '/cameras', id: 1 },
  { name: 'Map', href: '/map', id: 2 },
];

// ✅ Logout function with proper redirect
const logout = async () => {
  await client.auth.signOut();
  router.push('/'); // Redirect to login after logout
};
</script>

<template>
  <v-responsive>
    <v-app theme="dark">
      <NuxtLoadingIndicator color="blue" :throttle="0" />

      <!-- Sidebar Navigation (Only visible when logged in) -->
      <v-navigation-drawer v-if="user" app permanent>
        <v-list class="py-0">
          <v-list-item
            v-for="link in links"
            :key="link.id"
            :to="link.href"
            active-class="text-white bg-primary" 
            exact-active-class="text-white bg-primary"
            class="d-flex justify-center align-center text-decoration-none px-4 py-2"
          >
            {{ link.name }}
          </v-list-item>
          <!-- Logout Button -->
          <v-list-item @click="logout" class="text-red">
            Logout
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </v-main>
    </v-app>
  </v-responsive>
</template>
