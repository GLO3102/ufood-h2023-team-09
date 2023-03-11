<template>
  <div class="card">
    <!--image-->
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="restaurantPic[0]" alt="restaurant picture" />
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
export default {
  props: ["restaurant_id", "user_id"],

  data: () => ({
    numberVisits: "",
    restaurantName: "",
    restaurantPic: "",
  }),
  methods: {
    async calculNumberVisits(restaurant_id) {
      let counter = 0;
      console.log(restaurant_id);
      const visits = await this.userVisites;
      visits.forEach((element) => {
        if (element.restaurant_id === restaurant_id) {
          counter = counter + 1;
        }
      });
      this.numberVisits = counter;
      console.log(counter);
      return counter;
    },

    async getRestaurantName(restaurantID) {
      const restaurant = await getRestaurantById(restaurantID);
      this.restaurantName = restaurant.name;
      console.log(restaurant.name);
      return restaurant.name;
    },

    async getRestaurantsPicture(restaurantID) {
      const picture = await getRestaurantById(restaurantID).pictures;
      this.restaurantPic = picture;
      return picture;
    },
  },
};
</script>
