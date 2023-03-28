<template>
  <div class="hero" id="user-entire-page">
    <div class="hero-body">
      <!-- Begin user info-->
      <div>
        <nav class="level">
          <div class="level-item has-text-centered mb-5">
            <figure class="image is-4by4">
              <img
                class="is-rounded"
                src="https://i.pinimg.com/564x/05/a8/b9/05a8b9eea5a348454da598c4895c0ebc.jpg"
                alt="UserPicture"
              />
            </figure>
          </div>
          <div class="level-item">
            <div class="is-6 is-offset-32 has-text-centered">
              <h1 class="title is-2 p-4">{{ userStore.getUser().name }}</h1>
              <h2
                class="subtitle is-1 has-text-primary has-text-weight-bold p-4"
              >
                {{ userStore.getUser().rating }}
              </h2>
            </div>
          </div>
        </nav>
      </div>
      <!-- End user info-->

      <div>
        <!-- Begin Work Content IF USER HAVE VISITED RESTAURANTS-->
        <!--Carousel setting set on page-->
        <div v-if="!isFavoriteRestaurantsEmpty" class="box my-5">
          <!--carousel title-->
          <div class="has-text-centered">
            <div>
              <h1 class="title is-2">Visited Restaurants<br /></h1>
            </div>
          </div>

          <Carousel
            :wrap-around="true"
            :settings="settings"
            :breakpoints="breakpoints"
          >
            <!--debut card1-->
            <Slide v-for="visited in listRestaurantID" :key="visited">
              <div class="carousel__item">
                <UserRestaurantVisitedCard
                  :numberVisits="calculNumberVisits(visited)"
                  :restaurantId="visited"
                ></UserRestaurantVisitedCard>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <!-- End Work Content IF USER HAVE VISITED RESTAURANTS-->
        <!-- Begin Work Content IF USER DONT VISIT//GOTTA SHOW INDICATION OF NON VISITED AND LINK TO HOME PAGE-->
        <div v-if="isFavoriteRestaurantsEmpty" class="hero is-medium">
          <div class="box">
            <div class="has-text-centered">
              <div>
                <h1 class="title is-2">
                  There is no visited restaurants<br />
                </h1>
                <a href="./Home.vue">Back to Main Menu</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste de liste de restaurants favories ou autre -->
      <FavoriteLists :userId="userId" />
      <VisitedList :visits="userVisites" />

      <!-- End Work Content IF USER DONT VISIT-->
    </div>
  </div>
</template>

<script setup>
import UserRestaurantVisitedCard from "@/components/userComponents/UserRestaurantVisitedCard.vue";
import FavoriteLists from "../components/userComponents/FavoriteLists.vue";
import VisitedList from "../components/userComponents/VisitedList.vue";
import "vue3-carousel/dist/carousel.css";
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";
import { getRestaurantByID } from "../api/restaurantApi";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { getUserVisits } from "@/api/userApi.js";

const userId = ref("619c57e4fe6e16000458adf4");
const userStore = useUserStore();
const route = useRoute();
const userVisites = ref([]);
const listRestaurantID = ref([]);
const isFavoriteRestaurantsEmpty = ref(false);

onBeforeMount(async () => {
  let restaurantIdList = [];
  userVisites.value = await getUserVisits(route.params.id);
  userVisites.value.forEach(async (element) => {
    if (!restaurantIdList.includes(element.restaurant_id)) {
      restaurantIdList.push(element.restaurant_id);
    }
    const resto = await getRestaurantByID(element.restaurant_id);
    element["restoName"] = resto.name;
    userVisitesRestoNames.value.push(resto.name);
  });
  listRestaurantID.value = restaurantIdList;
  if (restaurantIdList.length === 0) {
    isFavoriteRestaurantsEmpty.value = true;
  } else {
    isFavoriteRestaurantsEmpty.value = false;
  }
});

function calculNumberVisits(restaurentID) {
  let counter = 0;
  const visits = userVisites.value;
  visits.forEach((element) => {
    if (element.restaurant_id === restaurentID) {
      counter = counter + 1;
    }
  });
  return counter;
}

const settings = {
  itemsToShow: 1,
};

const breakpoints = {
  640: { itemsToShow: 1.5 },
  750: { itemsToShow: 1.8 },
  1000: { itemsToShow: 2.5 },
  1200: { itemsToShow: 3 },
  1500: { itemsToShow: 3.5 },
};
</script>
<style scoped>
#user-entire-page {
  background: #fff;
  box-shadow: inset 100px 0px 100px -50px #959595,
    inset -100px 0px 100px -50px #959595;
  margin: 0;
}
#temporary {
  background-color: aqua;
  border-color: black;
  border-width: 10px;
}
.bottom-ul {
  display: flex;
  flex-direction: column;
}
label {
  display: inline-block;
  width: 100px;
}
.level {
  flex-wrap: wrap;
}
.level-item {
  padding: 10px;
}
</style>