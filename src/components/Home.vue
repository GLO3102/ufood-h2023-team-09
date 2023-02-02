<script setup>
import RestaurantCard from "./RestaurantCard.vue";
import json from "./hardcoded_resto.json";
let restaurantsList = json;
// Toggle dropdown menu
function dropDownToggle() {
  document.getElementById("dropdownCategories").classList.toggle("is-active");
}
// Close the dropdown menu when a click is made elswhere
window.onclick = function (event) {
  try{
    document.getElementById("dropdownCategories").classList.remove("is-active");
  } catch(error){
    // An error is thrown when we click on a link (this error doesn't have any impact)
    if (!(error  instanceof TypeError)){
      throw error;
      }
  }
}
// Toggle the range filter buttons
function rangeFilter(range) {
  document.getElementById(range).classList.toggle("is-active");
  let list = [...document.getElementsByClassName('restaurant-card')];
  list.forEach((card) => {
    let test = range;
    if(range === `range${card.dataset.range}`){
      card.style.display = 'block';
    }else{
      card.style.display = 'none';
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

    <div class="restaurant-list">
      <div v-for="restaurant in restaurantsList.items" :key="restaurant">
        <router-link to="/restaurant">
          <div class="restaurant-card" :id="restaurant.id" @click="Restaurant" :data-range="restaurant.price_range">
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
            ></RestaurantCard></div
        ></router-link>
      </div>
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
