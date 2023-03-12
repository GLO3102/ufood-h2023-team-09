<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import userVisitsJson from "@/dummy_jsons/hardcoded_userVisits.json";
import userJson from "@/dummy_jsons/hardcoded_user.json";
import restaurantJson from "@/dummy_jsons/hardcoded_resto.json";
import "vue3-carousel/dist/carousel.css";
import FavoriteLists from "./FavoriteLists.vue";

export default defineComponent({
  name: "Basic",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    FavoriteLists,
  },
  data: () => ({
    userInfo: userJson,
    userVisites: userVisitsJson,
    restaurantInfo: restaurantJson,
    userId: "633730caa2b5d64b72b51110",
    user: Object,
  }),

  methods: {
    getListRestaurantID() {
      let listID = [];
      this.userVisitsJson.items.forEach((element) => {
        if (!listID.includes(element.restaurant_id)) {
          listID.push(element.restaurant_id);
        }
      });
      return listID;
    },

    getRestaurantPicture() {
      console.log("get picture.com");
    },

    calculNumberVisits(restaurentID) {
      let counter = 0;
      this.userVisitsJson.items.forEach((element) => {
        if (element.restaurant_id == restaurentID) {
          counter = counter + 1;
        }
      });
      return counter;
    },

    getRestaurantName(restaurantID) {
      const name = "";
      this.restaurantJson.items.forEach((element) => {
        console.log(element.id, " ", restaurantID);
        if (element.id == restaurantID) {
          console.log(element.name);
          return element.name;
        }
      });
    },
  },
});
</script>
<script setup>
//TO REMOVE
const toggleViews = () => {
  if (useUserStore().favoriteRestaurants.length === 0) {
    useUserStore().$patch({ favoriteRestaurants: ["domino"] });
  } else {
    useUserStore().$patch({ favoriteRestaurants: [] });
  }
  let viewRestaurantsEmpty = document.getElementById("viewRestaurantsEmpty");
  let viewRestaurants = document.getElementById("viewRestaurants");
  viewRestaurantsEmpty.classList.toggle("is-hidden");
  viewRestaurants.classList.toggle("is-hidden");
};
const isFavoriteRestaurantsEmpty = computed(() => {
  return useUserStore().favoriteRestaurants.length === 0;
});

const settings = {
  itemsToShow: 1,
};

const breakpoints = {
  640: {
    itemsToShow: 1.5,
  },

  750: {
    itemsToShow: 1.8,
  },

  1000: {
    itemsToShow: 2.5,
  },
  1200: {
    itemsToShow: 3,
  },
  1500: {
    itemsToShow: 3.5,
  },
};
</script>

<template>
  <div class="hero" id="user-entire-page">
    <FavoriteLists :user-id="userId"/>
    <div class="hero-body">
      <!-- Begin user info-->
      <div>
        <nav class="level">
          <div class="level-item has-text-centered">
            <figure class="image is-4by4">
              <img class="is-rounded" src="" alt="UserPicture" />
            </figure>
          </div>

          <div class="level-item">
            <div class="is-6 is-offset-32 has-text-centered">
              <h1 class="title is-2">{{ userInfo.name }} <br /></h1>
              <h2 class="subtitle is-1 has-text-primary has-text-weight-bold">
                <br />{{ userVisites.total }}
              </h2>
            </div>
          </div>
        </nav>
      </div>
      <!-- End user info-->

      <div>
        <!-- Begin Work Content IF USER HAVE VISITED RESTAURANTS-->
        <!--Carousel setting set on page-->
        <div v-show="!isFavoriteRestaurantsEmpty" class="box">
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
            <Slide v-for="visited in getListRestaurantID()" :key="visited">
              <div class="carousel__item">
                <div class="card">
                  <!--image-->
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img
                        src="https://i.pinimg.com/236x/83/c1/e7/83c1e7c64211f263f588a2f74dd309c6.jpg"
                        alt="restaurant picture"
                      />
                    </figure>
                  </div>
                  <!--fin image-->
                  <!-- debut number visits-->
                  <div class="card-content is-overlay">
                    <span class="tag is-primary is-size-5">
                      {{ calculNumberVisits(visited) }}
                    </span>
                  </div>
                  <!--end number visits-->
                  <!-- debut name -->
                  <div class="card-content slider-text">
                    <div class="is-size-5 box">
                      {{ getRestaurantName(visited) }}
                    </div>
                  </div>
                  <!--end name-->
                </div>
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
        <div v-show="isFavoriteRestaurantsEmpty" class="hero is-medium">
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

      <!-- End Work Content IF USER DONT VISIT-->
    </div>
    <div class="hero-foot">
      <div class="">
        <div class="tabs is-centered">
          <ul class="bottom-ul">
            <li><a href="./User.vue">And this is the bottom</a></li>
            <!--TO REMOVE-->
            <button
              id="temporary"
              class="button is-size-6"
              v-on:click="toggleViews()"
            >
              CLICK TO SEE OTHER VIEW WITH RESTAURANTS
            </button>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

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
div {
  margin: 3px;
}
label {
  display: inline-block;
  width: 100px;
}

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
