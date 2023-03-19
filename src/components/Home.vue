<script setup>
import { onMounted, computed, ref } from "vue";
import { getRestaurants } from "../api/restaurantApi.js";
import { useRoute } from 'vue-router'
import RestaurantCard from "./RestaurantCard.vue";

let restaurantsList = ref({ total: 0 });
const input = ref(null);

const page = ref(0);
const pageLimit = ref(12);
const searchFilter = ref("");
const genreFilters = ref([]);
const rangeFilters = ref([]);
let lat = ref(0);
let lon = ref(0);

const pagesTotal = computed(() => {
  return Math.floor(restaurantsList.value.total / pageLimit.value) + 1;
});
const search = useRoute().query.search;
if (search !== undefined) {
  searchFilter.value = search;
}

async function resetList(newPage) {
  page.value = newPage;
  restaurantsList.value = await getRestaurants(
    page.value,
    pageLimit.value,
    searchFilter.value,
    genreFilters.value,
    rangeFilters.value,
    lat.value,
    lon.value
  );
  window.scrollTo(0, 0);
}

// Initialization
onMounted(async () => {
  await getLocation();
  await resetList(0);
  input.value.focus();
});

// Filter by Price Range ---------------------------------------------------
// Defines the states of the buttons
const ranges = ref({
  1: false,
  2: false,
  3: false,
  4: false,
});
// Toggle the range filter buttons et refresh
async function rangeFilter(button) {
  ranges.value[button] = !ranges.value[button];
  rangeFilters.value = Object.keys(ranges.value).filter(
    (key) => ranges.value[key]
  );
  await resetList(0);
}

// Filter by Genres ----------------------------------------
const genres = ref({
  desserts: false,
  bistro: false,
  ambiance: false,
  "fast-food": false,
  "fruits de mer": false,
  hamburgers: false,
  végétarien: false,
  santé: false,
  mexicain: false,
  café: false,
  libanais: false,
  italien: false,
  "happy hour": false,
  japonais: false,
  asiatique: false,
  steakhouse: false,
  boulangerie: false,
  grec: false,
  charcuterie: false,
  pizzeria: false,
  "cuisine moléculaire": false,
  vietnamien: false,
  indien: false,
  européen: false,
});
// Dropdown genre menu
let isDropdownActive = ref(false);
function dropDownToggle() {
  isDropdownActive.value = !isDropdownActive.value;
}
function closeDropdown() {
  isDropdownActive.value = false;
}
async function genreFilter(genre) {
  genres.value[genre] = !genres.value[genre];
  genreFilters.value = Object.keys(genres.value).filter(
    (key) => genres.value[key]
  );
  await resetList(0);
}
function format(str){
  let newStr = str[0].toUpperCase() + str.slice(1);
  return newStr;
}

// Gets the current location ------------------------
async function getLocation() {
  if (navigator.geolocation) {
    const position = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, showGetLocationError)
    });
    lat.value = position.coords.latitude;
    lon.value = position.coords.longitude;
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
async function showGetLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
  await resetList(0);
}
async function toggleLocation(){
  if(lat.value === 0 && lon.value === 0){
    await getLocation();
  }else{
    lat.value = 0;
    lon.value = 0;
  }
  await resetList(0);
}
</script>

<template>
  <div class="home-container" @click="closeDropdown()">
    <div class="search-filter">
      <div class="search field has-addons">
        <p class="control">
          <input
            ref="input"
            @keyup.enter="resetList(0)"
            v-model="searchFilter"
            class="input"
            type="search"
            placeholder="Search..."
          />
        </p>
        <p class="control">
          <button class="button" @click="resetList(0)">
            &#x1F50E;
          </button>
        </p>
      </div>
      <div class="filter">
        <div class="is-flex-wrap-nowrap">
          <!-- Geo-Location Toggle Button -->
          <button 
            class="button" 
            :class="{ 'is-active': lon !== 0 && lat !== 0 }"
            @click="toggleLocation()"
          ><img src="../assets/location.png" width="20" height="20" alt="Location-Icon">
          </button>
          <!-- Dropdown menu -->
          <div
            class="dropdown"
            :class="{ 'is-active': isDropdownActive }"
            @click.stop="dropDownToggle()"
          >
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>Categories</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a
                  v-for="(bool, genre) in genres"
                  :key="genre"
                  class="dropdown-item"
                  :class="{ 'is-active': bool }"
                  @click="genreFilter(genre)"
                  >{{ format(genre) }}</a
                >
              </div>
            </div>
          </div>
        </div>
          <!-- Range filter buttons -->
        <div class="is-flex-wrap-nowrap field has-addons">
          <p class="control">
            <button
            class="button"
            :class="{ 'is-active': ranges[1] }"
            @click="rangeFilter(1)"
          >$</button>
          </p>
          
           
          <p class="control">
            <button
            class="button"
            :class="{ 'is-active': ranges[2] }"
            @click="rangeFilter(2)"
          >
            $$
          </button>
        </p>
          <p class="control">
            <button
            class="button"
            :class="{ 'is-active': ranges[3] }"
            @click="rangeFilter(3)"
          >
            $$$
          </button>
        </p>
          <p class="control">
            <button
            class="button"
            :class="{ 'is-active': ranges[4] }"
            @click="rangeFilter(4)"
          >
            $$$$
          </button>
        </p>
          
        </div>
      </div>
    </div>
    <!-- List of categories selected -->
    <div class="categories-selected-container">
      <div
        v-for="(bool, genre) in genres"
        :key="genre"
        class="categories-selected tags has-addons"
        :class="{ 'is-tag-active': bool }"
      >
        <span class="tag is-info is-medium">{{ format(genre) }}</span>
        <a @click="genreFilter(genre)" class="tag is-delete is-medium"></a>
      </div>
    </div>

    <!-- Dynamically generated restaurants list -->
    <div class="restaurant-list" ref="restaurantListScroll">
      <RestaurantCard
        :restaurant="restaurant"
        v-for="restaurant in restaurantsList.items"
        :key="restaurant"
      />
    </div>
    <!-- Shows a message if no match is found -->
    <h1 v-if="restaurantsList.total === 0" class="title is-3 has-text-centered">
      No match found
    </h1>
    <!-- Pagination to help navigate -->
    <nav
      v-if="pagesTotal > 1"
      class="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul class="pagination-list">
        <li v-if="page > 1">
          <a
            class="pagination-link"
            aria-label="Goto page 1"
            @click="resetList(0)"
            >1</a
          >
        </li>
        <li v-if="page > 1">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="page > 0">
          <a
            class="pagination-link"
            :aria-label="`Goto page ${page}`"
            @click="resetList(page - 1)"
            >{{ page }}</a
          >
        </li>
        <li>
          <a
            class="pagination-link is-current"
            :aria-label="`Goto page ${page + 1}`"
            aria-current="page"
            @click="resetList(page)"
            >{{ page + 1 }}</a
          >
        </li>
        <li v-if="page + 2 < pagesTotal">
          <a
            class="pagination-link"
            :aria-label="`Goto page ${page + 2}`"
            @click="resetList(page + 1)"
            >{{ page + 2 }}</a
          >
        </li>
        <li v-if="page + 2 < pagesTotal">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="page + 1 < pagesTotal">
          <a
            class="pagination-link"
            :aria-label="`Goto page ${pagesTotal}`"
            @click="resetList(pagesTotal - 1)"
            >{{ pagesTotal }}</a
          >
        </li>
      </ul>
    </nav>
    <div class="has-text-centered pb-5">GLO-3102 Home</div>
    <div class="has-text-centered pb-5">
      <a 
        class="has-text-black" 
        href="https://www.flaticon.com/free-icons/location" 
        title="location icons"
      >Location icon created by Freepik - Flaticon</a>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  background: #fff;
  box-shadow: inset 100px 0px 100px -50px #959595,
    inset -100px 0px 100px -50px #959595;
}
.search-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0;
  margin-inline: 5px;
}
.search {
  margin-top: 3vw;
  display: flex;
}
.filter {
  margin-top: 3vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 1;
}
.dropdown-item.is-active {
  display: none;
}
.categories-selected-container {
  min-height: 3vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  flex-grow: 1;
}
.categories-selected {
  display: flex;
  margin: 6px;
  display: none;
}
.is-tag-active {
  display: flex;
}
.tags .tag {
  margin-bottom: 0;
}
.tags {
  margin-bottom: 6px;
}
.tags:not(:last-child) {
  margin-bottom: 6px;
}
.tags:last-child {
  margin-bottom: 6px;
}
.is-active {
  background-color: rgb(220, 220, 220);
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
