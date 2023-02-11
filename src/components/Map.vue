<template>
  <div class="box mb-6">
    <div
      class="is-flex is-flex-direction-row is-justify-content-space-around pb"
    >
      <div class="is-flex is-flex-direction-row">
        <input class="input is-info m-1" placeholder="enter adress" />
        <button class="button is-info m-1">Find me</button>
      </div>
      <div class="">
        <button class="button is-primary m-1">Show directions</button>
        <button class="button is-primary m-1">Hide directions</button>
      </div>
    </div>
    <div id="map" style="height: 500px; width: 100%"></div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import { onMounted } from "vue";
onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicGFsZXg5OTkiLCJhIjoiY2xlMDl4YWMwMG42OTN2bzgwbjd1bW82aCJ9.fH1lEdpJsNacjxdL8RlYog";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
});
</script>
<style scoped>
.pb {
  padding-bottom: 1.25rem;
}
</style>
