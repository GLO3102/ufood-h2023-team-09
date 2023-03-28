<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation";
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
</style>
