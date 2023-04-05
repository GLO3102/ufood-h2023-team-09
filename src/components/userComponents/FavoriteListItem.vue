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
      class="tag is-info is-small"
      :to="`/restaurant/${restaurant.id}`"
      >{{ restaurant.name }}</router-link
    >
    <a
      v-if="
        isOptionsReady &&
        (route.params.id === userStore.getUser().id || route.name === 'Home')
      "
      @click="$emit('removeItem', restaurant.id)"
      class="tag is-delete is-small is-danger"
    ></a>
    <a @click="toggleOptions" class="tag is-small has-background-grey-lighter"
      >&#8226;&#8226;&#8226;</a
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getRestaurantByID } from "../../api/restaurantApi";

export default defineComponent({
  name: "FavoriteListItem",
  data: () => {
    return {
      restaurant: Object,
      isOptionsReady: false,
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
    this.restaurant = await getRestaurantByID(this.restaurantId);
  },
});
</script>
<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const route = useRoute();
</script>
