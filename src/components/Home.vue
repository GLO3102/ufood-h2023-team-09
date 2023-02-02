<script setup>
import RestaurantCard from "./RestaurantCard.vue";

import json from "./hardcoded_resto.json";
let restaurantsList = json;

// Dropdown
// Toggle dropdown menu
function dropDownToggle() {
  document.getElementById("dropdownCategories").classList.toggle("is-active");
}
// Close the dropdown menu when a click is made elswhere
window.onclick = function (event) {
  try {
    document.getElementById("dropdownCategories").classList.remove("is-active");
  } catch (error) {
    // An error is thrown when we click on a link (this error doesn't have any impact)
    // If the error is TypeError, ignore it, otherwise throw it
    if (!(error instanceof TypeError)) {
      throw error;
    }
  }
};

// Filter
// Defines the states of the buttons
let is1Active = false;
let is2Active = false;
let is3Active = false;
let is4Active = false;
// Toggle the range filter buttons
function rangeFilter(range) {
  // Toggles the state of the buttons
  switch (range) {
    case "1":
      is1Active = !is1Active;
      break;
    case "2":
      is2Active = !is2Active;
      break;
    case "3":
      is3Active = !is3Active;
      break;
    case "4":
      is4Active = !is4Active;
      break;
  }
  // Toggles class "isActive" to change background color between white and light grey
  document.getElementById(range).classList.toggle("is-active");
  // Gets all restaurants card
  let list = [...document.getElementsByClassName("restaurant-card")];
  // Iterate through all cards and evaluate if they show or disappear
  list.forEach((card) => {
    //range === card.dataset.range

    if (
      (!is1Active && !is2Active && !is3Active && !is4Active) || // All buttons are inactive OR
      (is1Active && card.dataset.range === "1") || // Button 1 is active AND current card's range is 1 OR
      (is2Active && card.dataset.range === "2") || // Button 2 is active AND current card's range is 2 OR
      (is3Active && card.dataset.range === "3") || // Button 3 is active AND current card's range is 3 OR
      (is4Active && card.dataset.range === "4") // Button 4 is active AND current card's range is 4 OR
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
</script>

<template>
  <div>
    <div class="search-filter">
      <div class="search">
        <input class="input" type="search" placeholder="Search..." />
      </div>

      <div class="filter">
        <!-- Dropdown menu -->
        <div
          class="dropdown"
          id="dropdownCategories"
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
              <a href="#" class="dropdown-item"> Fast Food </a>
              <a class="dropdown-item"> Indian </a>
              <a href="#" class="dropdown-item is-active"> Asian </a>
              <a href="#" class="dropdown-item"> Pizza </a>
              <a href="#" class="dropdown-item"> Middle Eastern </a>
            </div>
          </div>
        </div>

        <!-- Range filter buttons -->
        <button class="button" id="1" @click="rangeFilter('1')">$</button>
        <button class="button" id="2" @click="rangeFilter('2')">$$</button>
        <button class="button" id="3" @click="rangeFilter('3')">$$$</button>
        <button class="button" id="4" @click="rangeFilter('4')">$$$$</button>
      </div>
    </div>

    <!-- Dynamically generated restaurants list -->
    <div class="restaurant-list">
      <div
        v-for="restaurant in restaurantsList.items"
        :key="restaurant"
        class="restaurant-card"
        :id="restaurant.id"
        :data-range="restaurant.price_range"
      >
        <router-link to="/restaurant">
          <RestaurantCard
            :name="restaurant.name"
            :id="restaurant.id"
            :address="restaurant.address"
            :tel="restaurant.tel"
            :location="restaurant.location"
            :opening_hours="restaurant.opening_hours"
            :monday="restaurant.opening_hours.monday"
            :tuesday="restaurant.opening_hours.tuesday"
            :wednesday="restaurant.opening_hours.wednesday"
            :thursday="restaurant.opening_hours.thursday"
            :friday="restaurant.opening_hours.friday"
            :saturday="restaurant.opening_hours.sturday"
            :sunday="restaurant.opening_hours.sunday"
            :pictures="restaurant.pictures"
            :genres="restaurant.genres"
            :price_range="restaurant.price_range"
            :rating="restaurant.rating"
          ></RestaurantCard
        ></router-link>
      </div>
    </div>

    <div class="search-filter">GLO-3102 Home</div>
  </div>
</template>


<style scoped>
.search-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3vw;
  margin-inline: 5px;
}
.search {
  width: 500px;
  margin-top: 3vw;
}
.filter {
  margin-top: 3vw;
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 1;
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
  width: 480px;
  margin-inline: 1vw;
  margin-bottom: 2vw;
  flex-shrink: 1;
}
</style>
