<script>
function dropDownOnOff() {
  let dropdown = document.getElementById("dropdownCategories");
  dropdown.classList.toggle("is-active");
}

import RestoCard from "./RestoCard.vue";
export default {
  name: "app",
  components: { "resto-card": RestoCard },
};
</script>



<template>
  <div>
    <h1>Restaurants</h1>

    <input class="input" type="search" placeholder="Search..." />
    <div class="dropdown" id="dropdownCategories" @click="dropDownOnOff()">
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

    <div class="resto-list">
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
      <resto-card></resto-card>
    </div>
    

    <div>GLO-3102 Home</div>
  </div>
</template>

<style>
resto-card{
  width: 280px;
}
</style>
