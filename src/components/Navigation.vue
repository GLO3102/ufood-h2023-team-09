<script>
  export default {
    methods: {
      toggleBurger () {
        let burgerIcon = document.getElementById('burger');
        let dropMenu = document.getElementById('navbarBasicExample');
        burgerIcon.classList.toggle('is-active');
        dropMenu.classList.toggle('is-active');
      }
    }
  }
</script>
<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/restaurant">
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
      <router-link class="navbar-item" to="/restaurant">Restaurant</router-link>
      <router-link class="navbar-item" to="/user">User</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light">
            <img src="@/assets/person.svg" width="40" height="40"/>
            Log in
          </a>
          <a class="button is-primary">
            Sign-up
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
