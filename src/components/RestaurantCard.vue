<script setup>
// Saves current day of the week as a number from 0 to 6, 0 being Sunday, into a variable
let today = new Date().getDay();
const color_map = ["black", "warning", "primary", "danger"];
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
        </div>
      </div>

      <!-- Display the list of genres -->
      <div class="genres-container block">
        <div class="genres" v-for="genre in genres" :key="genre">
          <span class="tag is-large is-light">{{ genre }}</span>
        </div>
      </div>

      <!-- Displays today's opening hours -->
      <div class="block">
        <div v-if="today === 1">Today : {{ monday }}</div>
        <div v-else-if="today === 2">Today : {{ tuesday }}</div>
        <div v-else-if="today === 3">Today : {{ wednesday }}</div>
        <div v-else-if="today === 4">Today : {{ thursday }}</div>
        <div v-else-if="today === 5">Today : {{ friday }}</div>
        <div v-else-if="today === 6">Today : {{ saturday }}</div>
        <div v-else>Today : {{ sunday }}</div>
      </div>

      <div class="block">{{ address }}</div>
      <div class="block">{{ tel }}</div>
      <div class="block">
        <span :class="'tag is-' + color_map[price_range - 1]">
          {{ "$".repeat(price_range) }}</span
        >
      </div>
      <div class="rating-container">
      <svg style="display:none;">
        <defs>
          <symbol id="fivestars">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(24)"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(48)"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(72)"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd"  transform="translate(96)"/>
          </symbol>
        </defs>
      </svg>
      <div class="rating">
      <!--   <div class="rating-bg" style="width: 90%;"></div> -->
        <progress class="rating-bg" :value="rating" max="5"></progress>
        <svg><use xlink:href="#fivestars"/></svg>
      </div>
    </div>
      <div class="block">Cote : {{ rating }}</div>
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
.genres-container {
  margin-block: 8px;
  display: flex;
  flex-wrap: wrap;
}
.genres {
  padding: 4px;
  margin: 4px;
}
</style>


