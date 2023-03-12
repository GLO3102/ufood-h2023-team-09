<template>
  <div class="card">
    <!--image-->
    <div v-show="false">{{ setRestaurant() }}</div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="restaurantPic[0]" alt="restaurant picture" />
      </figure>
    </div>
    <!--fin image-->
    <!-- debut number visits-->
    <div class="card-content is-overlay">
      <span class="tag is-primary is-size-5">{{ numberVisits }} </span>
    </div>
    <!--end number visits-->
    <!-- debut name -->
    <div class="card-content slider-text">
      <div class="is-size-5 box">{{ restaurantName }}</div>
    </div>
    <!--end name-->
  </div>
</template>

<script>
import { getRestaurantById } from "../api/userApi.js";
export default {
  props: ["numberVisits", "restaurantId"],

  data: () => ({
    restaurantName: "",
    restaurantPic: "",
  }),
  methods: {
    async setRestaurant() {
      const restaurant = await getRestaurantById(this.restaurantId);
      this.restaurantName = restaurant.name;
      this.restaurantPic = restaurant.pictures;
    },
  },
};
</script>
