<template>
  <div
    class="card is-clickable"
    @click="$router.push(`/restaurant/${restaurantId}`)"
  >
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
import { getRestaurantByID } from "../../api/restaurantApi.js";
import { useUserStore } from "../../stores/user";

export default {
  props: ["numberVisits", "restaurantId"],
  data: () => ({
    restaurantName: "",
    restaurantPic: "",
  }),
  async created() {
    try {
      const restaurant = await getRestaurantByID(
        this.restaurantId,
        useUserStore().getUser().token
      );
      this.restaurantName = restaurant.name;
      this.restaurantPic = restaurant.pictures;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.card {
  width: 280px;
  max-width: 280px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.card-image {
  width: 280px;
  height: 225px;
}
.card-content {
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
}
</style>
