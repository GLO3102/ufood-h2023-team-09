<script setup>
// Toggle dropdown menu
function dropDownOnOff() {
  document.getElementById("dropdownCategories").classList.toggle("is-active");
}
// Close the dropdown menu when a click is made elswhere
window.onclick = function () {
  document.getElementById("dropdownCategories").classList.remove("is-active");
};
// Toggle the range filter buttons
function rangeFilter(range) {
  document.getElementById(range).classList.toggle("is-active");
}

function displayRestaurantsList() {
  const restaurantsList = {
    items: [
      {
        name: "La Barberie",
        id: "53ec122d27aafe77d8c37b8",
        address: "310 Rue Saint-Roch, Québec, QC G1K 6S2",
        tel: "(418) 522-4373",
        location: {
          type: "Point",
          coordinates: [-71.2180951, 46.8178912],
        },
        opening_hours: { monday: "12h-24h" },
        pictures: ["picture.com"],
        genres: ["casual"],
        price_range: 3,
        rating: 4.2,
      },
    ],
    total: 1,
  };
  let container = document.getElementById("restaurant-list");
  restaurantsList.items.forEach((item, index) => {
    let card = document.createElement("restaurant-card");
    card.name = "test";
    container.appendChild(card);
  });
}
</script>

<script>
import RestaurantCard from "./RestaurantCard.vue";
export default {
  name: "app",
  components: { "restaurant-card": RestaurantCard },
};
</script>

<template>
  <div>
    <div class="search-filter">
      <div class="search">
        <input class="input" type="search" placeholder="Search..." />
      </div>

      <div class="filter">
        <div
          class="dropdown"
          id="dropdownCategories"
          @click.stop="dropDownOnOff()"
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
              <a href="#" class="dropdown-item"> Fast Food </a>
              <a class="dropdown-item"> Indian </a>
              <a href="#" class="dropdown-item is-active"> Asian </a>
              <a href="#" class="dropdown-item"> Pizza </a>
              <!-- <hr class="dropdown-divider" /> -->
              <a href="#" class="dropdown-item"> Middle Eastern </a>
            </div>
          </div>
        </div>

        <button class="button" id="range1" @click="rangeFilter('range1')">
          $
        </button>
        <button class="button" id="range2" @click="rangeFilter('range2')">
          $$
        </button>
        <button class="button" id="range3" @click="rangeFilter('range3')">
          $$$
        </button>
        <button class="button" id="range4" @click="rangeFilter('range4')">
          $$$$
        </button>
      </div>
    </div>

    <div class="restaurant-list" @mounted="displayRestaurantsList()">
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
      <div class="restaurant-card"><restaurant-card></restaurant-card></div>
    </div>

    <div>GLO-3102 Home</div>
  </div>
</template>


<style scoped>
.search-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3dvw;
  margin-inline: 5px;
}
.search {
  width: 500px;
  margin-top: 3dvw;
}
.filter {
  margin-top: 3dvw;
  display: flex;
  flex-wrap: nowrap;
}
.is-active {
  background-color: rgb(220, 220, 220);
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.restaurant-card {
  width: 400px;
  margin: 1dvw;
}
</style>
