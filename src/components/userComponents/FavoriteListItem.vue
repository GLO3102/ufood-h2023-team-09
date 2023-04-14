<template>
  <div class="tags has-addons">
    <a
      v-if="isOptionsReady"
      class="tag is-small has-background-grey-lighter"
      @click="$emit('moveUp', restaurant.id)"
      >&#8593;</a
    >
    <a
      v-if="isOptionsReady"
      class="tag is-small has-background-grey-lighter"
      @click="$emit('moveDown', restaurant.id)"
      >&#8595;</a
    >
    <router-link
      class="tag is-info is-small name"
      :to="`/restaurant/${restaurant.id}`"
      >{{ restaurant.name }}</router-link
    >
    <a
      v-if="isOptionsReady"
      @click="$emit('removeItem', restaurant.id)"
      class="tag is-delete is-small is-danger"
    ></a>
    <a 
      v-if="(route.params.id === userStore.getUser().id || route.name !== 'User')" 
      @click="toggleOptions" class="tag is-small has-background-grey-lighter options"
      >&#8226;&#8226;&#8226;</a
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getRestaurantByID } from "../../api/restaurantApi";
import { useUserStore } from "../../stores/user";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "FavoriteListItem",
  data: () => {
    return {
      restaurant: Object,
      isOptionsReady: false,
      userStore: useUserStore(),
      route: useRoute(),
    };
  },
  props: {
    restaurantId: String,
  },
  methods: {
    toggleOptions() {
      this.isOptionsReady = !this.isOptionsReady;
    },
  },
  emits: ["removeItem", "moveUp", "moveDown"],
  async created() {
    try{
      this.restaurant = await getRestaurantByID(this.restaurantId, useUserStore().getUser().token);
    }catch(e){
      console.log(e)
    }
  },
});
</script>
<style scoped>
.name{
  max-width: 75%;
  white-space: normal;
  height: auto;  
  padding-block: 3px;
}
</style>
