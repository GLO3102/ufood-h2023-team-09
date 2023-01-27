<script setup>
function dropDownOnOff() {
  document.getElementById("dropdownCategories").classList.toggle("is-active");
}
window.onclick = function () {
  document.getElementById("dropdownCategories").classList.remove("is-active");
};
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

        <button class="button">$</button>
        <button class="button">$$</button>
        <button class="button">$$$</button>
        <button class="button">$$$$</button>
      </div>
    </div>

    <div class="restaurant-list">
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
