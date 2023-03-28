<template>
  <div class="restaurant-card">
    <VisitModal
      v-if="showVisitModal"
      @close="closeVisitModal"
      :id="restaurant.id"
      :name="restaurant.name"
    />
    <ListModal
      v-if="showListModal"
      @close="closeListModal"
      :id="restaurant.id"
      :name="restaurant.name"
    />
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <router-link :to="`/restaurant/${restaurant.id}`">
            <img
              v-if="restaurant.pictures.length > 0"
              :src="restaurant.pictures[0]"
              alt="Placeholder image"
            />
            <img
              v-if="restaurant.pictures.length === 0"
              src="@/assets/placeholderimage.jpg"
              alt="Placeholder image"
            />
          </router-link>
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <router-link :to="`/restaurant/${restaurant.id}`"
              ><span class="title is-3">{{
                restaurant.name.slice(0, 50)
              }}</span></router-link
            >
          </div>
          <span
            :class="
              'navbar-end is-medium tag is-' +
              color_map[restaurant.price_range - 1]
            "
            >{{ "$".repeat(restaurant.price_range) }}</span
          >
        </div>

        <!-- Display the list of genres -->
        <div class="genres-container block">
          <div class="genres" v-for="genre in restaurant.genres" :key="genre">
            <span class="tag is-large is-info">{{ format(genre) }}</span>
          </div>
        </div>

        <!-- Displays today's opening hours -->
        <div class="opening-hours mb-1">
          <div v-if="today === 1">
            Today : {{ restaurant.opening_hours.monday }}
          </div>
          <div v-else-if="today === 2">
            Today : {{ restaurant.opening_hours.tuesday }}
          </div>
          <div v-else-if="today === 3">
            Today : {{ restaurant.opening_hours.wednesday }}
          </div>
          <div v-else-if="today === 4">
            Today : {{ restaurant.opening_hours.thursday }}
          </div>
          <div v-else-if="today === 5">
            Today : {{ restaurant.opening_hours.friday }}
          </div>
          <div v-else-if="today === 6">
            Today : {{ restaurant.opening_hours.saturday }}
          </div>
          <div v-else>Today : {{ restaurant.opening_hours.sunday }}</div>
        </div>

        <!-- Direction button -->
        <div class="tooltip mb-1">
          <span class="tooltiptext">{{ restaurant.address }}</span>
          {{ restaurant.address.slice(0, 49) + "..." }}
        </div>

        <!-- Phone button -->
        <div class="mb-1">{{ restaurant.tel }}</div>

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
            <button
              class="button is-primary mr-1"
              @click="openVisitModal"
              :disabled="!userStore.getIsLoggedIn()"
            >
              Rate
            </button>
            <button
              class="button is-primary mr-1"
              @click="openListModal"
              :disabled="!userStore.getIsLoggedIn()"
            >
              Add to favorites
            </button>
            <div class="navbar-end">
              <div class="rating">
                <progress
                  class="rating-bg"
                  :value="restaurant.rating"
                  max="5"
                ></progress>
                <svg>
                  <use xlink:href="#fivestars" />
                </svg>
              </div>
              <div class="tag is-warning is-medium">
                {{ restaurant.rating.toFixed(1) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VisitModal from "../modals/VisitModal.vue";
import ListModal from "../modals/FavoriteListModal.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

let showVisitModal = ref(false);

const openVisitModal = () => {
  showVisitModal.value = true;
};
const closeVisitModal = () => {
  showVisitModal.value = false;
};

let showListModal = ref(false);

const openListModal = () => {
  showListModal.value = true;
};
const closeListModal = () => {
  showListModal.value = false;
};
// Saves current day of the week as a number from 0 to 6, 0 being Sunday, into a variable
let today = new Date().getDay();
const color_map = ["success", "primary", "danger", "black"];

defineProps(["restaurant"]);
function format(str) {
  let newStr = str[0].toUpperCase() + str.slice(1);
  return newStr;
}
</script>

<style scoped>
.restaurant-card {
  width: 480px;
  margin-inline: 1vw;
  margin-bottom: 2vw;
  flex-shrink: 1;
}
.tooltip {
  position: relative;
  display: inline-block;
}
.card-image {
  overflow: hidden;
}
img:hover {
  transform: scale3d(1.5, 1.5, 1);
  transition: transform 5s ease-in-out;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: fit-content + 20px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
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
.evaluation {
  flex-wrap: wrap;
}
.navbar-end {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.evaluation > * {
  margin-top: 10px;
  margin-bottom: 0;
}
</style>
