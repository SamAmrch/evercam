<template>
    <v-container>
      <v-row justify="center">
        <v-col  sm="6">
            <v-date-picker show-adjacent-months>
                
            </v-date-picker>
        </v-col>
      </v-row>
    </v-container>
</template>
  
  <script setup>
  import { ref } from 'vue';
  
  const date = ref(null);
  </script>