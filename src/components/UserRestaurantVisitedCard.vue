<template>
  <div class="card">
    <!--image-->
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
  async created(){
    const restaurant = await getRestaurantById(this.restaurantId);
      this.restaurantName = restaurant.name;
      this.restaurantPic = restaurant.pictures;
  }
};
</script>

<style scoped>

.card {
  width: 300px;
  max-width: 300px;
  height: 350px;
}  
.card-content {
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
} 

</style>