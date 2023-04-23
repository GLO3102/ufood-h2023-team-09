<script setup>
import { onMounted, onBeforeMount, computed, ref, watch } from "vue";
import SearchUser from "../components/userComponents/SearchUserComponent.vue";
import { getRestaurants, getAllRestaurants } from "../api/restaurantApi.js";
import RestaurantCard from "../components/homeComponents/RestaurantCard.vue";
import { getSimilitude, format, accentLess } from "../utils/formats.js";
import { useUserStore } from "@/stores/user";
import RestaurantMap from "../components/homeComponents/RestaurantMap.vue";
const userStore = useUserStore();

let restaurantsList = ref({ total: 0 });
let completeList = ref({});
let completeListCopy = [];
let completeListFiltered = ref({});
let words = [];
let geolocationAllowed = false;
let isLoaded = ref(false);

const page = ref(0);
const pageLimit = ref(12);
const pagesTotal = computed(() => {
  let result = restaurantsList.value.total / pageLimit.value;
  let rounded = Math.floor(restaurantsList.value.total / pageLimit.value);
  if (result !== rounded) rounded += 1;
  return rounded;
});

// Initialization  ---------------------------------------------------------------------------------
function getDictionnaries(list) {
  for (let restaurant of list) {
    words = words.concat(restaurant.name.split(" "));
    words.push(restaurant.name.replace("Restaurant", ""));
    for (let genre of restaurant.genres) {
      genres.value[genre] = false;
    }
  }
  words.filter((word) => word.length > 0);
  words = Array.from(new Set(words));
}
function resetList(newPage) {
  page.value = newPage;
  const first = page.value * pageLimit.value;

  let isRangeActive = false;
  for (let range in ranges.value) {
    if (ranges.value[range]) {
      isRangeActive = true;
      break;
    }
  }
  let isGenreActive = false;
  for (let genre in genres.value) {
    if (genres.value[genre]) {
      isGenreActive = true;
      break;
    }
  }

  let temp = [];
  for (let restaurant of completeList.value.items) {
    if (!isRangeActive || ranges.value[restaurant.price_range]) {
      let isGenreMatching = false;
      for (let genre of restaurant.genres) {
        if (genres.value[genre]) {
          isGenreMatching = true;
          break;
        }
      }
      if (!isGenreActive || isGenreMatching) {
        if (
          accentLess(restaurant.name.toLowerCase()).includes(
            accentLess(searchFilter.value.toLowerCase())
          )
        )
          temp.push(restaurant);
      }
    }
  }
    completeListFiltered.value = { items: [...temp] };
    restaurantsList.value.items = temp.slice(first, first + pageLimit.value);
    restaurantsList.value.total = temp.length;
}
onBeforeMount(async () => {
  completeList.value = await getAllRestaurants(userStore.getUser().token);
  getDictionnaries(await completeList.value.items);
  completeListCopy = Array.from(completeList.value.items);

  await getLocation();
  if (lon.value !== 0 && lat.value !== 0) sortList();

  resetList(0);
  isLoaded.value = true;
});
onMounted(() => input.value.focus());
function scrollToTop() {
  window.scrollTo(0, 0);
}

// Filter by Price Range ---------------------------------------------------------------------------
const rangeFilters = ref([]);
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
  resetList(0);
}

// Filter by Genres ----------------------------------------------------------------------------------
const genreFilters = ref([]);
const genres = ref({});
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
  resetList(0);
}

// Geo location ---------------------------------------------------------------------------
let lat = ref(0);
let lon = ref(0);

async function getLocation() {
  if (navigator.geolocation) {
    const position = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, showGetLocationError);
    });
    geolocationAllowed = true;
    lat.value = position.coords.latitude;
    lon.value = position.coords.longitude;
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
async function showGetLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      geolocationAllowed = false;
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
  resetList(0);
}

let showMap = ref(false);

async function toggleMapMode() {
  showMap.value = !showMap.value;
}

async function toggleLocation() {
  if (lat.value === 0 && lon.value === 0) {
    await getLocation();
    completeList.value.items = Array.from(completeListCopy);
    sortList();
  } else {
    lat.value = 0;
    lon.value = 0;
    completeList.value.items = completeListCopy;
  }
  resetList(0);
}
function sortList() {
  for (let restaurant of completeList.value.items) {
    restaurant.distance = getDistanceFrom(restaurant.location.coordinates);
  }
  if (lat.value === 0 && lon.value === 0) {
    completeList.value.items.sort((a, b) => b.distance - a.distance);
  } else {
    completeList.value.items.sort((a, b) => a.distance - b.distance);
  }
}
function getDistanceFrom(destination) {
  let latDif = destination[0] - lat.value;
  if (latDif < 0) latDif = -latDif;
  let lonDif = destination[1] - lon.value;
  if (lonDif < 0) lonDif = -lonDif;
  return latDif + lonDif;
}

// Search auto-complete ------------------------------------------------------------------
const searchFilter = ref("");
const input = ref(null);
let suggestions = ref({ items: [] });
let isSearchActive = ref(false);

const searchParam = userStore.getSearchParam();
if (searchParam !== "") {
  searchFilter.value = searchParam;
  userStore.setSearchParam("");
}

function getClosests(str) {
  if (str.length === 1) return [str.toLowerCase()];

  let closests = [];
  for (let word of words) {
    let similitude = getSimilitude(str.toLowerCase(), word.toLowerCase());
    if (similitude > 0.5)
      closests.push({ value: word.toLowerCase(), similitude: similitude });
  }
  closests.sort((word1, word2) => word1.similitude - word2.similitude);
  if (closests.length === 0) return [str.toLowerCase()];
  return closests.map((word) => word.value);
}

watch(searchFilter, async (newValue, oldValue) => {
  resetList(0)
  if (newValue === "" || newValue === null) isSearchActive.value = false;
  else isSearchActive.value = true;

  suggestions.value.items = [];
  let values = getClosests(newValue);
  values = Array.from(new Set(values));
  values = values.slice(0, 5);
  for (let value of values) {
    let list = await getRestaurants(
      0,
      10,
      value,
      genreFilters.value,
      rangeFilters.value,
      lat.value,
      lon.value
    );
    suggestions.value.items = suggestions.value.items.concat(await list.items);
  }
  suggestions.value.items = Array.from(
    new Set(suggestions.value.items.map((resto) => resto.id))
  ).map((id) => {
    return suggestions.value.items.find((resto) => resto.id === id);
  });
  suggestions.value.items = suggestions.value.items.slice(0, 10);
  if (
    suggestions.value.items.length === 0 ||
    searchFilter.value === suggestions.value.items[0].name
  )
    isSearchActive.value = false;
});
</script>

<template>
  <div class="home-container" @click="closeDropdown()">
    <div class="search-filter">
      <div
        class="search field has-addons dropdown"
        :class="{ 'is-active': isSearchActive }"
      >
        <p class="control">
          <input
            ref="input"
            @keyup.enter="
              resetList(0);
              isSearchActive = false;
            "
            v-model="searchFilter"
            class="input is-link"
            type="search"
            placeholder="Search restaurents..."
          />
        </p>
        <SearchUser v-if="userStore.getIsLoggedIn()" />
        <p class="control">
          <button class="button" @click="resetList(0)">&#x1F50E;</button>
        </p>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a
              v-for="restaurant in completeListFiltered.items"
              class="dropdown-item"
              :key="restaurant.id"
              @click="
                searchFilter = restaurant.name;
                resetList(0);
              "
            >
              {{ restaurant.name }}
            </a>
          </div>
        </div>
      </div>

      <div class="filter">
        <div class="is-flex-wrap-nowrap">
          <button
            v-if="isLoaded"
            class="button"
            :class="{ 'is-active': showMap }"
            @click="toggleMapMode()"
          >
            Map Mode
          </button>
          <!-- Geo-Location Toggle Button -->
          <button
            class="button"
            :class="{ 'is-active': lon !== 0 && lat !== 0 }"
            @click="toggleLocation()"
          >
            <img
              src="../assets/location.png"
              width="20"
              height="20"
              alt="Location-Icon"
            />
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
          <p
            class="control"
            v-for="range in Object.entries(ranges)"
            :key="range[0]"
          >
            <button
              class="button"
              :class="{ 'is-active': range[1] }"
              @click="rangeFilter(range[0])"
            >
              {{ "$".repeat(range[0]) }}
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
    <div class="restaurant-list" ref="restaurantListScroll" v-if="!showMap">
      <RestaurantCard
        :restaurant="restaurant"
        v-for="restaurant in restaurantsList.items"
        :key="restaurant"
      />
    </div>
    <!-- Dynamically generated restaurants list -->
    <div class="restaurant-map" ref="restaurantMap" v-if="showMap">
      <RestaurantMap :restaurants="completeListFiltered.items" />
    </div>
    <!-- Shows a message if no match is found -->
    <h1 v-if="completeList.total === 0" class="title is-3 has-text-centered">
      No match found
    </h1>
    <!-- Pagination to help navigate -->
    <nav
      v-if="pagesTotal > 1"
      class="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul class="pagination-list" v-if="!showMap">
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
    <div v-if="!isLoaded" class="is-flex is-justify-content-center is-align-items-center mb-5">
      <div class="button is-centered is-success" @click="scrollToTop()">
        ...loading...
      </div>
    </div>
    <div class="is-flex is-justify-content-center is-align-items-center mb-5">
      <button class="button is-centered" @click="scrollToTop()">
        Back to the top
      </button>
    </div>

    <div class="has-text-centered pb-5">GLO-3102 Home</div>
    <div class="has-text-centered pb-5">
      <a
        class="has-text-black"
        href="https://www.flaticon.com/free-icons/location"
        title="location icons"
        >Location icon created by Freepik - Flaticon</a
      >
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
.field:not(:last-child) {
  margin-bottom: 0;
}
.restaurant-map {
  margin-inline: 2vw;
}
</style>
