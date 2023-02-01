<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Basic",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});

data: () => ({
  //carousel settings
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
  <div class="hero">
    <div class="hero-body">
      <!-- Begin user info-->
      <div>
        <nav class="level">
          <div class="level-item has-text-centered">
            <figure class="image is-4by4">
              <img
                class="is-rounded"
                src="https://i.pinimg.com/564x/15/a8/bc/15a8bc7417bb5583b96c24a359fd5dfe.jpg"
                alt="UserPicture"
              />
            </figure>
          </div>

          <div class="level-item">
            <div class="is-6 is-offset-32 has-text-centered">
              <h1 class="title is-2">Dr. Panda<br /></h1>
              <h2 class="subtitle is-1 has-text-primary has-text-weight-bold">
                <br />750
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
            wrap-around="true"
            :settings="settings"
            :breakpoints="breakpoints"
          >
            <Slide :key="slide">
              <div class="carousel__item">
                <div class="card">
                  <figure class="image is-4by3">
                    <img
                      src="https://i.pinimg.com/236x/83/c1/e7/83c1e7c64211f263f588a2f74dd309c6.jpg"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="card-content is-overlay">
                  <span class="tag is-primary is-size-5">20</span>
                </div>
                <div class="card-content slider-text">
                  <div class="is-size-5 box">RESTAURANT_NAME</div>
                </div>
              </div>
            </Slide>
            <Slide :key="slide">
              <div class="carousel__item">
                <div class="card">
                  <figure class="image is-4by3">
                    <img
                      src="https://i.pinimg.com/564x/08/25/38/082538afc45124898e4a792a5250d352.jpg"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="card-content is-overlay">
                  <span class="tag is-primary is-size-5">9</span>
                </div>
                <div class="card-content slider-text">
                  <div class="is-size-5 box">RESTAURANT_NAME</div>
                </div>
              </div>
            </Slide>
            <Slide :key="slide">
              <div class="carousel__item">
                <div class="card">
                  <figure class="image is-4by3">
                    <img
                      src="https://i.pinimg.com/564x/95/19/fb/9519fb6c2a9576b4017356c29fb15f93.jpg"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="card-content is-overlay">
                  <span class="tag is-primary is-size-5">15</span>
                </div>
                <div class="card-content slider-text">
                  <div class="is-size-5 box">RESTAURANT_NAME</div>
                </div>
              </div>
            </Slide>
            <Slide :key="slide">
              <div class="carousel__item">
                <div class="card">
                  <figure class="image is-4by3">
                    <img
                      src="https://i.pinimg.com/564x/9f/2f/6b/9f2f6bd333752f91e23514ea1a946e3c.jpg"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="card-content is-overlay">
                  <span class="tag is-primary is-size-5">10</span>
                </div>
                <div class="card-content slider-text">
                  <div class="is-size-5 box">RESTAURANT_NAME</div>
                </div>
              </div>
            </Slide>
            <Slide :key="slide">
              <div class="carousel__item">
                <div class="card">
                  <figure class="image is-4by3">
                    <img
                      src="https://i.pinimg.com/564x/98/10/2c/98102cbaf0d75501f968ece02a83482f.jpg"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="card-content is-overlay">
                  <span class="tag is-primary is-size-5">8</span>
                </div>
                <div class="card-content slider-text">
                  <div class="is-size-5 box">RESTAURANT_NAME</div>
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
              class="button is-size-4"
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
</style>
