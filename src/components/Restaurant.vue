<template>
  <div class = "container">
    {{resto_data.name}}
    <div>
      <span :style="'color:' + color_map[resto_data.price_range-1]">
        {{ "$".repeat(resto_data.price_range)}}</span>
  </div>
    <div>
      {{ resto_data.address }}
    </div>
    <div>
      {{ resto_data.location }}
    </div>
    <div>
      {{ resto_data.tel }}
    </div>
    <div>
      <span v-for="genre in resto_data.genres" :key="genre" class="tag is-info" style="margin: 2px;">{{genre}}</span>
  </div>
    <div class="rating-container">
      <svg style="display:none;">
        <defs>
          <symbol id="fivestars">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(24)"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(48)"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd" transform="translate(72)"/>
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24" fill="white" fill-rule="evenodd"  transform="translate(96)"/>
          </symbol>
        </defs>
      </svg>
      <div class="rating">
      <!--   <div class="rating-bg" style="width: 90%;"></div> -->
        <progress class="rating-bg" value="0" max="5"></progress>
        <svg><use xlink:href="#fivestars"/></svg>
      </div>
    </div>

    <div class="schedule" id="schedule">
      <IloveWeb></IloveWeb>
    </div>
    <MapLocation></MapLocation>
    <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide"
            :settings="settings">
            <Slide  :key="slide">
        <div class="carousel__item">
                <div class="card">
                  <figure >
                    <img
                      src="https://www.menupix.com/menus/2016022328479_01.jpg"
                      alt=""
                    />
                  </figure>
                </div>          
          </div>
      </Slide>      
      <Slide  :key="slide">
        <div class="carousel__item">
                <div class="card">
                  <figure>
                    <img
                      src="https://offloadmedia.feverup.com/secretlosangeles.com/wp-content/uploads/2019/10/22095522/70991088_150912036128545_2481090655335180758_n.jpg"
                      alt=""
                    />
                  </figure>
                </div>          
          </div>
      </Slide>
      <Slide :key="slide">
        <div class="carousel__item">
                <div class="card">
                  <figure>
                    <img
                      src="http://www.lphishiring.com/assets/culture-1.jpg"
                      alt=""
                    />
                  </figure>
                </div>          
          </div>
      </Slide>
      </Carousel>
    
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


</template>

<script setup>
 
  import { onMounted } from 'vue';
  const color_map= ["#04c23d","#f0d802","#f08502","#f00202"];
  const hours = json.opening_hours;

  onMounted((hours) => {
    console.log("Mounted");
    formatSchedule1(hours);
  })

  const formatSchedule1 = (hours) => {
    let container1 = document.getElementById("schedule");
    let table = document.createElement("table");
    for (let key in hours){
      let table_element = document.createElement("tr");
      table_element.textContent = key + "->" + hours[key];
      table.appendChild(table_element);
    }
    container1.appendChild(table);
    
  }
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
  import { Carousel, Slide } from 'vue3-carousel';
  import  Schedule  from './Schedule.vue';
  import MapLocation from './MapLocation.vue';
  import json from './hardcoded_resto.json';
  import 'vue3-carousel/dist/carousel.css';
  
  json = json.items[0];

  export default defineComponent ({
    name: 'Basic',
    components: {
      Carousel,
      Slide,
      MapLocation,
      "IloveWeb" : Schedule
    },
    data: () => ({
      currentSlide: 0,
      resto_data : json
    }),
    methods: {
      slideTo(val) {
        this.currentSlide = val;
      }
    }
  });
</script>

<style scoped>

.carousel {
  position: relative;

  display: flex;
  justify-content: center;
  flex-direction: column;

}
.carousel__item {
  position: relative;

  display: flex;
  justify-content: center;
  flex-direction: column;
  

}


.carousel__prev{
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
<style>
.rating {
  width: 120px;
  height: 24px;
  position: relative;
  background-color: gray;
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
</style>