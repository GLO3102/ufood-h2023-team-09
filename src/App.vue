<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation";
import { onBeforeMount } from "vue";
import { useUserStore } from "./stores/user";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const userStore = useUserStore();
const token = cookies.get("ufood-token");
onBeforeMount(async () => {
  if (token !== null) await userStore.getToken(token);
});
</script>

<style>
.evaluation {
  display: flex;
}

.rating {
  width: 120px;
  height: 24px;
  position: relative;
  margin-right: 10px;
}

.rating progress.rating-bg {
  -webkit-appearance: none;
  -moz-appearence: none;
  appearance: none;
  border: none;
  display: inline-block;
  height: 24px;
  width: 100%;
  color: orange;
}

.rating progress.rating-bg::-webkit-progress-value {
  background-color: orange;
}

.rating progress.rating-bg::-moz-progress-bar {
  background-color: orange;
}

.rating svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
