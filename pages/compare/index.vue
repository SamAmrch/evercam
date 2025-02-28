<template>
  <v-container>
    <v-navigation-drawer location="right" width="50%" permanent>
      <!-- Tabs -->
      <v-tabs v-model="selectedPeriod" class="py-0">
        <v-tab value="before">Before</v-tab>
        <v-tab value="after">After</v-tab>
      </v-tabs>

      <v-container>
        <!-- Date Picker -->
        <v-date-picker 
          v-model="selectedValues[selectedPeriod].date" 
          show-adjacent-months 
          color="primary" 
          max-height="40%" 
          class="mb-8" 
          hide-header
        ></v-date-picker>

        <!-- Time Picker Alternative (v-select) -->
        <v-select 
          v-model="selectedValues[selectedPeriod].time" 
          :items="timeOptions" 
          label="Select Hour"
          color="primary"
        ></v-select>

        <!-- Display Selected Date & Time -->
        <p v-if="selectedValues[selectedPeriod].date && selectedValues[selectedPeriod].time">
          {{ selectedPeriod }} Time: {{ formattedDateTime }}
        </p>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const selectedPeriod = ref("before"); // Default to "before"

// Reactive object for managing date & time for both periods
const selectedValues = reactive({
  before: { date: null, time: null },
  after: { date: null, time: null }
});

// Generate time options (00:00 - 23:00)
const timeOptions = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

// Compute formatted date & time dynamically
const formattedDateTime = computed(() => {
  const { date, time } = selectedValues[selectedPeriod.value];
  return date && time ? `${date} ${time}` : "";
});
</script>
