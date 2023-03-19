<template>
  <div>
    <VisitModal
      v-if="showVisitModal"
      @close="closeVisitModal"
      :id="resto_data.id"
      :name="resto_data.name"
    />
    <ListModal
      v-if="showListModal"
      @close="closeListModal"
      :id="resto_data.id"
      :name="resto_data.name"
    />
    <slot v-if="displayError">
      <div
        class="box is-flex is-align-items-center is-justify-content-center is-flex-direction-column"
      >
        <figure>
          <img src="../assets/something_went_wrong.png" alt="" />
        </figure>
        <p class="title is-3">{{ displayErrorMsg }}</p>
        <p class="title is-3">Try again later...</p>
      </div>
    </slot>
    <slot v-else-if="resto_data" class="resto">
      <div class="container is-max-widescreen">
        <br /><br />
        <div
          class="box is-flex is-justify-content-space-between"
          id="name-buttons"
        >
          <div>
            <h1 class="title">{{ resto_data.name }}</h1>
            <div class="rating-container">
              <svg style="display: none">
                <defs>
                  <symbol id="fivestars">
                    <path
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                      fill="white"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                      fill="white"
                      fill-rule="evenodd"
                      transform="translate(24)"
                    />
                    <path
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                      fill="white"
                      fill-rule="evenodd"
                      transform="translate(48)"
                    />
                    <path
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                      fill="white"
                      fill-rule="evenodd"
                      transform="translate(72)"
                    />
                    <path
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                      fill="white"
                      fill-rule="evenodd"
                      transform="translate(96)"
                    />
                  </symbol>
                </defs>
              </svg>
              <div class="evaluation">
                <div class="rating">
                  <!--   <div class="rating-bg" style="width: 90%;"></div> -->
                  <progress
                    class="rating-bg"
                    :value="resto_data.rating"
                    max="5"
                  ></progress>
                  <svg>
                    <use xlink:href="#fivestars" />
                  </svg>
                </div>
                <span class="tag is-warning">{{
                  resto_data.rating.toFixed(1)
                }}</span>
                <span
                  :class="'tag is-' + color_map[resto_data.price_range - 1]"
                >
                  {{ "$".repeat(resto_data.price_range) }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="is-flex is-align-items-center"
            :style="{ padding: '10px' }"
          >
            <button
              class="is-flex button is-primary mr-3 is-large is-responsive"
              @click="openVisitModal"
            >
              Rate
            </button>
            <button
              class="is-flex button is-primary is-large is-responsive"
              @click="openListModal"
            >
              Add to favorites
            </button>
          </div>
        </div>

        <div class="box" id="second-box">
          <h1 class="title">About us</h1>
          <div class="tooltip mb-1">
            <span class="tooltiptext">{{ resto_data.address.split(',').slice(0, -1).join(',') }}</span>
          </div>
          <div class="resto-info">
            <div class="first-part">
              <Schedule
                :restaurantSchedule="resto_data.opening_hours"
              ></Schedule>
              <div class="box">
                <table class="table is-hoverable">
                  <thead>
                    <th><abbr title="Tags">Tags </abbr></th>
                  </thead>
                  <tbody v-for="tag in resto_data.genres" :key="tag">
                    <tr>
                      <th id="tags" class="tag is-info is-medium">{{ tag }}</th>
                    </tr>
                  </tbody>
                </table>
                <table class="table is-hoverable">
                  <thead>
                    <th><abbr title="Phone number">Phone Number </abbr></th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{{ resto_data.tel }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="second-part">
              <Carousel
                id="gallery"
                :items-to-show="1"
                :wrap-around="true"
                v-model="currentSlide"
                :settings="settings"
              >
                <Slide v-for="index in resto_data.pictures.length" :key="index">
                  <div class="carousel__item">
                    <div class="card">
                      <figure class="image is-4by3">
                        <img :src="resto_data.pictures[index - 1]" alt="" />
                      </figure>
                    </div>
                  </div>
                </Slide>
                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
            </div>
          </div>
        </div>
        <Carousel
          id="thumbnails"
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
          ref="carousel"
          v-model="currentSlide"
        >
          <Slide v-for="index in resto_data.pictures.length" :key="index">
            <div class="carousel__item" @click="slideTo(index - 1)">
              <figure class="image is-4by3">
                <img :src="resto_data.pictures[index - 1]" alt="" />
              </figure>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <br /><br />

        <div class="container">
          <Map
            :restaurantCoordinates="resto_data.location.coordinates"
            :address="resto_data.address"
          />
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup>
import Map from "./Map.vue";
import { ref } from "vue";
import VisitModal from "./VisitModal.vue";
import ListModal from "./ListModal.vue";

let showVisitModal = ref(false);

const openVisitModal = () => {
  showVisitModal.value = true;
};
const closeVisitModal = () => {
  showVisitModal.value = false;
};

let showListModal = ref(false);
const openListModal = () => {
  showListModal.value = true;
};
const closeListModal = () => {
  showListModal.value = false;
};

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
    itemsToShow: 2,
  },
  1200: {
    itemsToShow: 3,
  },

  1300: {
    itemsToShow: 3.5,
  },
};
</script>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import { getRestaurantByID } from "../api/restaurantApi.js";
import Schedule from "./Schedule.vue";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Basic",
  components: {
    Carousel,
    Slide,
  },
  data: () => ({
    currentSlide: 0,
    resto_data: null,
    displayError: false,
    displayErrorMsg: null,
    color_map: ["success", "primary", "danger", "black"],
  }),
  async created() {
    try {
      this.resto_data = await getRestaurantByID(this.$route.params.id);
    } catch (e) {
      this.displayError = true;
      this.displayErrorMsg = e.message;
    } finally {
    }
  },
  methods: {
    slideTo(val) {
      this.currentSlide = val;
    },
  },
});
</script>

<style scoped>
span + span {
  margin-left: 10px;
}

.resto {
  background: #fff;
  box-shadow: inset 100px 0px 100px -50px #959595,
    inset -100px 0px 100px -50px #959595;
}

.container {
  margin: auto;
}

.image img {
  object-fit: cover;
}

.slider_container {
  width: 100%;
  margin: auto;
  flex-shrink: 1;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
}

.carousel {
  position: relative;
  display: block;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 1;
}

.carousel__item {
  position: relative;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 1;
  max-height: 350px;
  max-width: 500px;
}
#name-buttons {
  flex-direction: row;
}

@media screen and (max-width: 1216px) {
  .resto-info {
    flex-direction: column;
  }
}

@media screen and (max-width: 500px) {
  .first-part {
    flex-direction: column;
  }
  #name-buttons {
    flex-direction: column;
  }
}

.first-part {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.second-part {
  max-width: 600px;
  flex-shrink: 1;
}

.resto-info {
  display: flex;
}

.carousel__prev {
  box-sizing: content-box;
  border: 5px solid white;
  flex-shrink: 1;
}
</style>
<style scoped>
.carousel__slide {
  padding-left: 25px;
  padding-right: 25px;
  opacity: 0.25;
  transform: scale(0.8);
}

.carousel__slide--prev {
  opacity: 0.5;
}

.carousel__slide--next {
  opacity: 0.5;
}

.carousel__slide--active {
  opacity: 1;
  transform: scale(1);
}

#second-box {
  display: block;
}

#tags {
  margin-top: 10px;
}
</style>
