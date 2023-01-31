<template>
  <div class = "container">
    {{resto_data.name}}
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
        <progress class="rating-bg" value="3" max="5"></progress>
        <svg><use xlink:href="#fivestars"/></svg>
      </div>
    </div>

    <div class="schedule" id="schedule" ref="schedule">
      <button v-on:click="formatSchedule1(resto_data.opening_hours)"> hELLO</button>
    </div>
    
    <div class="slider_container">
      <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide }}</div>
      </Slide>
      </Carousel>

      <Carousel
        id="thumbnails"
        :items-to-show="4"
        :wrap-around="true"
        v-model="currentSlide"
        ref="carousel">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
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
</script>
<script>
  import { defineComponent } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  import json from './hardcoded_resto.json';
  import 'vue3-carousel/dist/carousel.css';

  export default defineComponent ({
    name: 'Basic',
    components: {
      Carousel,
      Slide
    },
    data: () => ({
      currentSlide: 0,
      resto_data : json
    }),
    methods: {
      slideTo(val) {
        this.currentSlide = val;
      },
      
      formatSchedule(array_json){
        let container1 = document.getElementById("schedule");
        let table = document.createElement("table");
        for (let key in array_json){
          let table_element = document.createElement("tr");
          table_element.textContent = key + "->" + array_json[key];
          table.appendChild(table_element);
        }
        container1.appendChild(table);
      }
    }
  });
</script>

<style>
.slider_container{
  width: 50%;
  margin: auto;
  border: 3px solid #73AD21;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

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