<template>
  <div class="box mb-6">
    <div id="map" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script setup>
import json from "../dummy_jsons/hardcoded_resto.json";
import { onMounted } from "vue";
const restaurantCoordinates = json.items[0].location.coordinates;
const restaurantAdress = json.items[0].address;
onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicGFsZXg5OTkiLCJhIjoiY2xlMDl4YWMwMG42OTN2bzgwbjd1bW82aCJ9.fH1lEdpJsNacjxdL8RlYog";
  const map = new mapboxgl.Map({
    container: "map",
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/mapbox/streets-v12",
    center: restaurantCoordinates,
    zoom: 12,
  });
  const marker = new mapboxgl.Marker({
    color: "#8F3BDE",
  })
    .setLngLat(restaurantCoordinates)
    .addTo(map);
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });
  map.addControl(directions, "top-left");
  directions.setDestination(restaurantAdress);
});
</script>

<style>
.mapbox-directions-instructions {
  height: 300px;
}
.pb {
  padding-bottom: 1.25rem;
}
</style>
