<template>
  <div class="resto">
    <div class="container is-max-widescreen">
      <br><br>
      <div class="box">
        <h1 class="title">{{ resto_data.name }}</h1>
        <div class="rating-container">
          <svg style="display:none;">
            <defs>
              <symbol id="fivestars">
                <path
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                  fill="white" fill-rule="evenodd" />
                <path
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                  fill="white" fill-rule="evenodd" transform="translate(24)" />
                <path
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                  fill="white" fill-rule="evenodd" transform="translate(48)" />
                <path
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                  fill="white" fill-rule="evenodd" transform="translate(72)" />
                <path
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
                  fill="white" fill-rule="evenodd" transform="translate(96)" />
              </symbol>
            </defs>
          </svg>
          <div class="evaluation">
            <div class="rating">
              <!--   <div class="rating-bg" style="width: 90%;"></div> -->
              <progress class="rating-bg" :value="resto_data.rating" max="5"></progress>
              <svg>
                <use xlink:href="#fivestars" />
              </svg>
            </div>
            <span class="tag is-warning">{{ resto_data.rating }}</span>
            <span :class="'tag is-' + color_map[resto_data.price_range - 1]">
              {{ "$".repeat(resto_data.price_range) }}</span>
          </div>

        </div>
      </div>


      <div class="box" id="second-box">
        <div>
          <h1 class="title">About us</h1>
          <div class="resto-info">
            <Schedule></Schedule>
            <div class="box">
              <table class="table is-hoverable">
                <thead>
                  <th><abbr title="Weekday">Tags </abbr></th>
                </thead>
                <tbody v-for="tag in  json.genres" :key="tag">
                  <tr>
                    <th id="tags" class="tag is-info is-medium"> {{ tag }}</th>
                  </tr>
                </tbody>
              </table>
              <table class="table is-hoverable">
                <thead>
                  <th><abbr title="Weekday">Cell Number </abbr></th>
                </thead>
                <tbody>
                  <tr>
                    <th> {{ resto_data.tel }}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide" :settings="settings">
              <Slide v-for="pic in json.pictures" :key="pic">
                <div class="carousel__item">
                  <div class="card">
                    <figure>
                      <img :src="pic" alt="" />
                    </figure>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>
        </div>


      </div>

      <div>
        {{ resto_data.location }}
      </div>


      <MapLocation></MapLocation>


      <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
        <Slide key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-4by3">
                <img src="https://i.pinimg.com/236x/83/c1/e7/83c1e7c64211f263f588a2f74dd309c6.jpg" alt="" />
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
        <Slide key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-4by3">
                <img src="https://i.pinimg.com/564x/08/25/38/082538afc45124898e4a792a5250d352.jpg" alt="" />
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
        <Slide key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-4by3">
                <img src="https://i.pinimg.com/564x/95/19/fb/9519fb6c2a9576b4017356c29fb15f93.jpg" alt="" />
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
        <Slide key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-4by3">
                <img src="https://i.pinimg.com/564x/9f/2f/6b/9f2f6bd333752f91e23514ea1a946e3c.jpg" alt="" />
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
        <Slide key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-4by3">
                <img src="https://i.pinimg.com/564x/98/10/2c/98102cbaf0d75501f968ece02a83482f.jpg" alt="" />
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
  </div>

</template>

<script setup>
const color_map = ["black", "warning", "primary"];

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
  1500: {
    itemsToShow: 4.5,
  },
};

</script>
<script>
import { defineComponent } from 'vue';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import Schedule from './Schedule.vue';
import MapLocation from './MapLocation.vue';
import json from './hardcoded_resto.json';
import 'vue3-carousel/dist/carousel.css';

json = json.items[0];

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    MapLocation,
  },
  data: () => ({
    currentSlide: 0,
    resto_data: json
  }),
  methods: {
    slideTo(val) {
      this.currentSlide = val;
    }
  }
});
</script>

<style scoped>
span+span {
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
  border: 3px solid #73AD21;
  flex-shrink: 1;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: greenyellow;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  flex-shrink: 1;
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
  padding: 25px;
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

  opacity: 1.0;
  transform: scale(1);
}

.evaluation {
  display: flex;
}

.rating {
  width: 120px;
  height: 24px;
  position: relative;
  margin-right: 10px;
}

.rating progress.rating-bg {
  -webkit-appearance: none;
  -moz-appearence: none;
  appearance: none;
  border: none;
  display: inline-block;
  height: 24px;
  width: 100%;
  color: orange;
}

.rating progress.rating-bg::-webkit-progress-value {
  background-color: orange;
}

.rating progress.rating-bg::-moz-progress-bar {
  background-color: orange;
}

.rating svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#second-box {
  display: block;
}

#tags {
  margin-top: 10px;
}
</style>