<script setup>
const links = [
  { name: 'Cameras', href: '/cameras', id: 1 },
  { name: 'Compare', href: '/compare', id: 2 },
  { name: 'Map', href: '/map', id: 3 },
  { name: 'Weather', href: '/weather', id: 4 },
];
</script>

<template>
  <v-responsive>
    <v-app theme="dark">
      <NuxtLoadingIndicator color="blue" :throttle="0"/>

      <!-- Sidebar with Navigation Links -->
      <v-navigation-drawer app>
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


