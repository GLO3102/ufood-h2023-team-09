<script setup>
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router';
    import { computed } from 'vue';
    const router = useRouter()
    const userStore = useUserStore()
    const toggleBurger = () => {
      let burgerIcon = document.getElementById('burger');
      let dropMenu = document.getElementById('navbarBasicExample');
      burgerIcon.classList.toggle('is-active');
      dropMenu.classList.toggle('is-active');
    }
    const logout = () => {
      userStore.logout()
      router.push('/')
    }
    const home = computed(() => {
      if(router.currentRoute.value.path != "/") {
        return true
      } else {
        return false
      }
    })
</script>

<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="@/assets/burger.svg" width="50" height="50"/>
    </router-link>
    <router-link class="navbar-item" id="logo-text" to="/">
      Ufood
    </router-link>
    <a role="button" class="navbar-burger" id="burger" v-on:click="toggleBurger()" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item">
        <input v-show="home" class="input" type="search" placeholder="Search...">
      </div>
      <router-link class="navbar-item" to="/restaurant">Restaurant</router-link>
      <router-link class="navbar-item" to="/user">User</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link v-show= !userStore.isLoggedIn class="button is-light" to="/log-in">
            <img src="@/assets/person.svg" width="40" height="40"/>
            Log in
          </router-link>
          <router-link v-show= !userStore.isLoggedIn class="button is-primary" to="/sign-up">
            Sign-up
          </router-link>
          <router-link v-show= userStore.isLoggedIn class="button is-light" to="/user">
            <img src="@/assets/person.svg" width="40" height="40"/>
            {{ userStore.username }}
          </router-link>
          <a class="button is-light" v-show="userStore.isLoggedIn" @click="logout()">
            <img src="@/assets/log-out.svg" width="40" height="40"/>
          </a>
         </div>
       </div>
      </div>
    </div>
  </nav>
</template>

<style>
#logo-text{
  font-size: 2rem;
}
</style>
