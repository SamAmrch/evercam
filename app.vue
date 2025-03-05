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

      <!-- ✅ Global Toolbar (Visible above everything) -->
      <v-toolbar v-if="user" class="bg-grey-darken-4" height="48">
          <v-img src="/evercam-logo.webp" max-height="84" max-width="120" class="mb-2"/>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="logout" class="text-red d-flex justify-center align-center text-decoration-none px-4 py-2">
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container fluid class="d-flex py-0 px-0">
        <!-- ✅ Sidebar as a Card (Only visible when logged in) -->
        <v-card v-if="user" class=" bg-grey-darken-4 rounded-0" width="15%">
          <v-list class="py-0">
            <v-list-item
              v-for="link in links"
              :key="link.id"
              :to="link.href"
              active-class="text-white bg-blue-darken-1"
              exact-active-class="text-white bg-primary"
              class="d-flex justify-center align-center text-decoration-none px-4 py-2"
            >
              {{ link.name }}
            </v-list-item>
          </v-list>
        </v-card>

        <!-- ✅ Main Content -->
        <v-main>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </v-main>
      </v-container>
      
    </v-app>
  </v-responsive>
</template>


