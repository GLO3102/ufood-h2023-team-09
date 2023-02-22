<template>
  <div class="box mb-6">
    <div id="map" style="height: 600px; width: 100%"></div>
  </div>
</template>

<script setup>
import json from "../dummy_jsons/hardcoded_resto.json";
import { onMounted } from "vue";
const restaurantCoordinates = json.items[0].location.coordinates;
onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicGFsZXg5OTkiLCJhIjoiY2xlMDl4YWMwMG42OTN2bzgwbjd1bW82aCJ9.fH1lEdpJsNacjxdL8RlYog";
  const map = new mapboxgl.Map({
    container: "map",
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
  directions.setDestination([
    restaurantCoordinates[0],
    restaurantCoordinates[1],
  ]);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Get the latitude and longitude coordinates
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        // Use Mapbox's Geocoding API to get the address
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoicGFsZXg5OTkiLCJhIjoiY2xlMDl4YWMwMG42OTN2bzgwbjd1bW82aCJ9.fH1lEdpJsNacjxdL8RlYog`
        )
          .then((response) => response.json())
          .then((data) => {
            // Get the formatted address from the geocoding response
            const address = data.features[0].place_name;
            // Use the address in your web app as needed
            directions.setOrigin([longitude, latitude]);
          })
          .catch((error) => console.error(error));
      },
      function (error) {
        console.error(error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
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
