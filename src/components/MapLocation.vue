<script setup>
import json from "../dummy_jsons/hardcoded_resto.json";

import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
</script>

<template>
  <div>
    <div class="card is-horizontal columns mb-6" style="margin-left: 0px">
      <div class="card-content column is-two-fifths">
        <label class="label">Enter your adress here</label>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="email" placeholder="8 rue Saint-Jean" />
          </div>
          <div class="control">
            <a class="button is-info"> Find direction </a>
          </div>
        </div>
        <label class="label">Destination Adress</label>
        <div class="content">
          <p>{{ json.items[0].address }}</p>
        </div>
      </div>
      <div class="card-image column is-three-fifths">
        <MapboxMap
          style="height: 400px"
          access-token="pk.eyJ1IjoibmljbWFuemEiLCJhIjoiY2xkcmlwb2YyMWg4eTN2bzRkcnNzeG51OSJ9.na-cjyob902Y_PBezmijNA"
          map-style="mapbox://styles/mapbox/streets-v11"
          :center="json.items[0].location.coordinates"
          :zoom="15"
          ><MapboxMarker :lng-lat="json.items[0].location.coordinates" />
        </MapboxMap>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 1200px) {
  .column.is-two-fifths {
    display: block;
  }
}
</style>
