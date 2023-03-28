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
        <div class="navbar-item">
          <input
            @keyup.enter="search()"
            v-model="input"
            v-show="isNotHome"
            class="input"
            type="search"
            placeholder="Search..."
          />
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
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const userStore = useUserStore();
const input = ref(null);

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

function search() {
  router.push({ path: "/", query: { search: input.value } });
  input.value = "";
}
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
