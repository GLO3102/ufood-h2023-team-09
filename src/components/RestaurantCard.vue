<script setup>
// Saves current day of the week as a number from 0 to 6, 0 being Sunday, into a variable
let today = new Date().getDay();
const color_map = ["success", "primary", "danger", "black"];
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <router-link to="/restaurant"
          ><img :src="pictures[0]" alt="Placeholder image"
        /></router-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left"></div>
        <div class="media-content">
          <router-link to="/restaurant"
            ><span class="title is-3">{{ name }}</span></router-link
          >
        </div>
        <span
          :class="'navbar-end is-medium tag is-' + color_map[price_range - 1]"
          >{{ "$".repeat(price_range) }}</span
        >
      </div>

      <!-- Display the list of genres -->
      <div class="genres-container block">
        <div class="genres" v-for="genre in genres" :key="genre">
          <span class="tag is-large is-info">{{ genre }}</span>
        </div>
      </div>

      <!-- Displays today's opening hours -->
      <div class="opening-hours button">
        <div v-if="today === 1">Today : {{ monday }}</div>
        <div v-else-if="today === 2">Today : {{ tuesday }}</div>
        <div v-else-if="today === 3">Today : {{ wednesday }}</div>
        <div v-else-if="today === 4">Today : {{ thursday }}</div>
        <div v-else-if="today === 5">Today : {{ friday }}</div>
        <div v-else-if="today === 6">Today : {{ saturday }}</div>
        <div v-else>Today : {{ sunday }}</div>
      </div>

      <!-- Direction button -->
      <div class="button">{{ address }}</div>

      <!-- Phone button -->
      <div class="button">{{ tel }}</div>

      <!-- Display rating with stars -->
      <div class="rating-container">
        <svg style="display: none">
          <defs>
            <symbol id="fivestars">
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                fill="white"
                fill-rule="evenodd"
              />
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                fill="white"
                fill-rule="evenodd"
                transform="translate(24)"
              />
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                fill="white"
                fill-rule="evenodd"
                transform="translate(48)"
              />
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                fill="white"
                fill-rule="evenodd"
                transform="translate(72)"
              />
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                fill="white"
                fill-rule="evenodd"
                transform="translate(96)"
              />
            </symbol>
          </defs>
        </svg>
        <div class="evaluation">
          <div class="button">Rate</div>
          <div class="navbar-end">
            <div class="rating">
              <progress class="rating-bg" :value="rating" max="5"></progress>
              <svg>
                <use xlink:href="#fivestars" />
              </svg>
            </div>
            <div class="tag is-warning is-medium">{{ rating }}</div>
          </div>
        </div>
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
.genres-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.genres {
  padding: 4px;
}
.address-phone {
  display: flex;
  flex-direction: column;
}
</style>
