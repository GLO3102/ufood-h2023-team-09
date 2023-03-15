<template>
  <div>
    <VisitModalReadOnly
      v-if="showVisitModal"
      @close="closeVisitModal"
      :id="restaurantId"
      :name="restaurantName"
    />
    <div @click="openVisitModal">
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
    </div>
  </div>
</template>

<script>
import { getRestaurantById } from "../api/userApi.js";
import VisitModalReadOnly from "./VisitModalReadOnly.vue";
export default {
  props: ["numberVisits", "restaurantId"],

  data: () => ({
    restaurantName: "",
    restaurantPic: "",
  }),
  async created() {
    const restaurant = await getRestaurantById(this.restaurantId);
    this.restaurantName = restaurant.name;
    this.restaurantPic = restaurant.pictures;
  },
};
</script>
<script setup>
import { ref } from "vue";

let showVisitModal = ref(false);

const openVisitModal = () => {
  showVisitModal.value = true;
};
const closeVisitModal = () => {
  showVisitModal.value = false;
};
</script>
