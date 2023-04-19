<template>
  <div class="box mb-6">
    <h1 class="title">Where to find it all</h1>
    <br /><br />
    <div id="map" style="height: 600px; width: 100%"></div>
  </div>
</template>
  
<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  restaurants: Array,
});

let map;
let selectedMarker;
const center = ref(props.restaurants[0].location.coordinates);
const zoom = ref(10);

onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicGFsZXg5OTkiLCJhIjoiY2xlMDl4YWMwMG42OTN2bzgwbjd1bW82aCJ9.fH1lEdpJsNacjxdL8RlYog";
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: center.value,
    zoom: zoom.value,
  });

  updateMarkers();

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    interactive: false
  });
  map.addControl(directions, "top-left");
  map.on("click", () => {
    directions.setDestination([selectedMarker.lng, selectedMarker.lat]);

  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoicGFsZXg5OTkiLCJhIjoiY2xlMDl4YWMwMG42OTN2bzgwbjd1bW82aCJ9.fH1lEdpJsNacjxdL8RlYog`
        )
          .then((response) => response.json())
          .then((data) => {
            const address = data.features[0].place_name;
            directions.setOrigin([longitude, latitude]);

            center.value = [longitude, latitude]
            map.flyTo({
              center: center.value,
              zoom: zoom.value,
              essential: true,
            });
          })
          .catch((error) => console.error(error));
      },
      function (error) {
        console.error(error);
      }
    );
  } else {
    center.value = props.restaurants[0].location.coordinates
    map.flyTo({
      center: center.value,
      zoom: zoom.value,
      essential: true,
    });
    console.error("Geolocation is not supported by this browser.");
  }
});

watch(() => props.restaurants, () => {
  zoom.value = map.getZoom()
  updateMarkers();
});

function updateMarkers() {
  const markers = document.querySelectorAll('.mapboxgl-marker');
  markers.forEach(marker => {
    marker.remove();
  });
  props.restaurants.forEach((restaurant) => {
    const lngLat = new mapboxgl.LngLat(
      restaurant.location.coordinates[0],
      restaurant.location.coordinates[1]
    );
    
    const popup = new mapboxgl.Popup().setHTML(`<a href="/restaurant/${restaurant.id}">${restaurant.name}</a><address>${restaurant.address}</a>`);
    const marker = new mapboxgl.Marker({
      color: "#8F3BDE",
    })
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      selectedMarker = marker.getLngLat()
    });
  });
}
</script>

  
  
  
<style>
.mapbox-directions-instructions {
  height: 300px;
}

.pb {
  padding-bottom: 1.25rem;
}

@media screen and (max-width: 500px) {
  .container {
    flex-wrap: wrap;
  }
}
</style>
  