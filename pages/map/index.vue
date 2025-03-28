<script setup>
import { ref, watchEffect } from "vue";
import { useSupabaseUser, useRouter } from "#imports";
import L from 'leaflet'
import { useCameraStore } from "@/stores/cameraStore";
import { useHead } from '#imports'

useHead({
  title: 'Map' 
})

definePageMeta({
  middleware: "auth",
  layout: "default",
});

const user = useSupabaseUser();
const router = useRouter();
const map = ref(null)
const cameraStore = useCameraStore();

// Redirect to login if user is not logged in
watchEffect(() => {
  if (!user.value) {
    router.push("/login");
  }
});

// Fetch cameras when the component loads
cameraStore.fetchCameras();

const onMapReady = () => {
  useLMarkerCluster({
    leafletObject: map.value.leafletObject,
    markers: cameraStore.camTable
  });
}

const redIcon = L.icon({
  iconUrl: "/Offline.png",
  iconSize: [32, 32], // Adjust the size if needed
  iconAnchor: [16, 32], // Center the icon properly
  popupAnchor: [0, -32] // Position the popup correctly
});

const greenIcon = L.icon({
  iconUrl: "/Online.png",
  iconSize: [32, 32], // Adjust the size if needed
  iconAnchor: [16, 32], // Center the icon properly
  popupAnchor: [0, -32] // Position the popup correctly
});

</script>

<template>
    <LMap
      ref="map"
      style="height: 75em"
      :zoom="4"
      :center="[39.248581, -47.910996]"
      :use-global-leaflet="true"
      @ready="onMapReady"
    >
      <LTileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution="&copy; <a href='https://carto.com/'>Carto</a>"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LFeatureGroup>
        <div v-for="camera in cameraStore.camTable" :key="camera.id">
            <div v-if="camera.status !== 'online'">
                <LMarker :lat-lng="[camera.location.lat, camera.location.lng]" :icon="redIcon">
                    <LPopup>
                        {{ camera.name }}
                    </LPopup>
                </LMarker>
            </div>
            <div v-else>
                <LMarker :lat-lng="[camera.location.lat, camera.location.lng]" :icon="greenIcon">
                    <LPopup>
                        {{ camera.name }}
                    </LPopup>
                </LMarker>
            </div>
            
        </div>
        
      </LFeatureGroup>
    </LMap>
  </template>