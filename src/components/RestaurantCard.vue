<script setup>
let today = new Date().getDay();
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="pictures" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left"></div>
        <div class="media-content">
          <p class="title is-4">{{ name }}</p>
          <div class="genres" v-for="genre in genres" :key="genre">
            {{ genre }}
          </div>
        </div>
      </div>
      <!-- <div>{{ opening_hours }}</div> -->
      <div v-if="today === 1">Today : {{ monday }}(monday)</div>
      <div v-else-if="today === 2">Today : {{ tuesday }}(tuesday)</div>
      <div v-else-if="today === 3">Today : {{ wednesday }}(wednesday)</div>
      <div v-else-if="today === 4">Today : {{ thursday }}(thursday)</div>
      <div v-else-if="today === 5">Today : {{ friday }}(friday)</div>
      <div v-else-if="today === 6">Today : {{ saturday }}(saturday)</div>
      <div v-else>Today : {{ sunday }}(sunday)</div>
      <div>{{ address }}</div>
      <div>{{ tel }}</div>
      <div>Price range : {{ price_range }}</div>
      <div class="content">
        <p>Cote : {{ rating }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "name",
    "id",
    "address",
    "tel",
    "location",
    "opening_hours",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "pictures",
    "genres",
    "price_range",
    "rating",
  ],
};
</script>

<style scoped>
.genres {
  display: inline;
  padding-inline: 2px;
  border: solid;
}
</style>


