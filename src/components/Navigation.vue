<script>
import IconLogo from './icons/IconLogo.vue';
export default {
  name: "nav-menu",
  components: {
    "icon-logo": IconLogo,
  },
};

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <icon-logo/>
    </a>
    <a class="navbar-item" href="/">
      Ufood
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            Sign-up
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style></style>
