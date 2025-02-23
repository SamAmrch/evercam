import { defineStore } from "pinia";

interface Camera {
  name: string;
  id: string;
  status: string;
  src: string;
  location: {lat: number; lng: number};
}

export const useCameraStore = defineStore("cameraStore", () => {
  const camTable = ref<Camera[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const filterStatus = ref<string>("all");

  // Fetch cameras
  const fetchCameras = async () => {
    try {
      const { data: camerasData } = await useFetch<{ cameras: Camera[] }>("https://media.evercam.io/v2/public/cameras");

      if (camerasData.value?.cameras) {
        camTable.value = camerasData.value.cameras.map((cam) => ({
            name: cam.name,
            id: cam.id,
            status: cam.status,
            src: `https://media.evercam.io/v2/cameras/${cam.id}/live/snapshot`,
            location: { lat: cam.location.lat, lng: cam.location.lng },
        }));
      }
      loading.value = false;
    } catch (err) {
      error.value = "Error fetching cameras.";
      loading.value = false;
    }
  };

  // Computed property for filtered cameras
  const filteredImages = computed<Camera[]>(() => {
    return filterStatus.value === "online"
      ? camTable.value.filter((camera) => camera.status.toLowerCase() === "online")
      : camTable.value;
  });

  // Update filter status
  const setFilter = (status: string) => {
    filterStatus.value = status;
  };

  return { camTable, loading, error, filterStatus, fetchCameras, filteredImages, setFilter };
});
