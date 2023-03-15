<template>
  <div class="box">
    <div class="title is-2 has-text-centered">Visits</div>
    <div class="is-flex is-flex-direction-column is-align-items-center">
      <div
        class="pt-2 is-flex is-flex-direction-row is-justify-content-space-between w-full"
        v-for="visit in visits"
        :key="visit"
      >
        <div>
          <span class="has-text-weight-bold">{{ visit.restoName }}</span>
          <br />
          <span>{{ formatDate(visit.date) }}</span>
        </div>

        <button class="button is-primary">View</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getRestaurantByID } from "../api/restaurantApi";
const props = defineProps(["visits"]);

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString();
}
const emit = defineEmits(["close"]);
</script>
<style>
.w-full {
  width: 100%;
}
</style>
