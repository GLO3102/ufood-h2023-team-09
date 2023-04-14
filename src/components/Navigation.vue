<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/assets/burger.svg" width="50" height="50" />
      </router-link>
      <router-link class="navbar-item" id="logo-text" to="/">
        Ufood
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        id="burger"
        v-on:click="toggleBurger()"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item dropdown" :class="{ 'is-active': isSearchActive }">
          <input
            @keyup.enter="search(input)"
            v-model="input"
            v-show="isNotHome"
            class="input"
            type="search"
            placeholder="Search..."
          />
          <div class="dropdown-menu">
          <div class="dropdown-content">
            <a
              v-for="restaurant in suggestions.items" 
              class="dropdown-item" 
              :key="restaurant.id"
              @click="search(restaurant.name)"
            >
              {{restaurant.name}}
            </a>
          </div>
        </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              v-if="!userStore.getIsLoggedIn()"
              class="button is-light"
              to="/log-in"
            >
              <img src="@/assets/person.svg" width="40" height="40" />
              Log in
            </router-link>
            <router-link
              v-if="!userStore.getIsLoggedIn()"
              class="button is-primary"
              to="/sign-up"
            >
              Sign-up
            </router-link>
            <router-link
              v-if="userStore.getIsLoggedIn()"
              class="button is-light"
              :to="`/user/${userStore.getUser().id}`"
            >
              <img
                class="pr-2"
                src="@/assets/person.svg"
                width="40"
                height="40"
              />
              {{ userStore.getUser().name }}
            </router-link>
            <a
              class="button is-light"
              v-if="userStore.getIsLoggedIn()"
              @click="logout()"
            >
              <img src="@/assets/log-out.svg" width="40" height="40" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { getAllRestaurants, getRestaurants } from "../api/restaurantApi";
import { getSimilitude } from "../utils/formats";

const router = useRouter();
const userStore = useUserStore();
const input = ref(null);
const isSearchActive = ref(false)
const restaurants = ref({})
let suggestions = ref({items: []});
let words = []

onBeforeMount(async() => {
  restaurants.value = await getAllRestaurants(userStore.getUser().token)
  getDictionnaries(await restaurants.value.items)
})

function getDictionnaries(list){
  for(let restaurant of list){
    words = words.concat(restaurant.name.split(" "))
    words.push(restaurant.name.replace('Restaurant', ''))
  }
  words.filter(word => word.length > 0)
  words = Array.from(new Set(words))
}

function getClosests(str){
  if(str.length === 1) return [str.toLowerCase()]

  let closests = []
  for(let word of words){
    let similitude = getSimilitude(str.toLowerCase(), word.toLowerCase())
    if(similitude > 0.5) closests.push({'value': word.toLowerCase(), 'similitude': similitude})
  }
  closests.sort((word1, word2)=> word1.similitude - word2.similitude)
  if(closests.length === 0) return [str.toLowerCase()]
  return closests.map(word=>word.value)
}

const isNotHome = computed(() => {
  return router.currentRoute.value.path != "/";
});

const toggleBurger = () => {
  let burgerIcon = document.getElementById("burger");
  let dropMenu = document.getElementById("navbarBasicExample");
  burgerIcon.classList.toggle("is-active");
  dropMenu.classList.toggle("is-active");
};

const logout = () => {
  userStore.logout();
  router.push("/");
};

function search(param) {
  userStore.setSearchParam(param)
  input.value = "";
  router.push({ path: "/"});
}

watch(input, async (newValue, oldValue) => {
  if(newValue === '' || newValue === null) isSearchActive.value = false
  else isSearchActive.value = true
  
  suggestions.value.items = []
  let values = getClosests(newValue)
  //let values = [newValue]

  values = Array.from(new Set(values))
  values = values.slice(0,5)
  for(let value of values){
    let list = await getRestaurants(0, 10, value, [], [], 0, 0)
    suggestions.value.items = suggestions.value.items.concat(await list.items) 
  }
  suggestions.value.items = Array.from(new Set(suggestions.value.items.map(resto => resto.id))).map(id => {
    return suggestions.value.items.find(resto => resto.id === id)
  })
  suggestions.value.items = suggestions.value.items.slice(0, 10)
  if(suggestions.value.items.length === 0 || input.value === suggestions.value.items[0].name) isSearchActive.value = false
})
</script>

<style scoped>
#logo-text {
  font-size: 2rem;
}
.navbar {
  position: static;
}
.navbar-burger {
  align-self: center;
}
.navbar-brand,
.navbar-menu,
.navbar-item {
  flex-shrink: 1;
}
.buttons {
  flex-wrap: nowrap;
}
</style>
