<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

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
</script>

<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <figure class="image is-4by4">
              <img
                class="is-rounded"
                src="https://i.pinimg.com/originals/05/11/45/051145a8e366876f859378154aa7df8b.jpg"
                alt="UserPicture"
              />
            </figure>
          </div>
          <div class="column is-6 is-offset-1">
            <h1 class="title is-2">Superhero Scaffolding</h1>
            <h2 class="subtitle is-4">
              Let this cover page describe a product or service.
            </h2>
            <br />
            <p class="has-text-centered">
              <a class="button is-medium is-info is-outlined"> Learn more </a>
            </p>
          </div>
        </div>
      </div>
      <!-- Begin Work Content -->
      <Carousel wrap-around="true" :items-to-show="2.5">
          <Slide :key="slide">
            <div class="carousel__item">
              <div class="card">
                <figure class="image is-3by5">
                  <img
                    src="https://i.pinimg.com/564x/c5/1a/41/c51a41fad6717db9106f0f2a89a2ea00.jpg"
                    alt=""
                  />
                </figure>
              </div>
              <div class="card-content slider-text">
                <div class="is-size-5 box">IMAGE_CAPTION_HERE</div>
              </div>
            </div>
          </Slide>
          <Slide :key="slide">
            <div class="carousel__item">2</div>
          </Slide>
          <Slide :key="slide">
            <div class="carousel__item">3</div>
          </Slide>
          <Slide :key="slide">
            <div class="carousel__item">4</div>
          </Slide>
          <Slide :key="slide">
            <div class="carousel__item">5</div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <!-- End Work Content -->
    </div>
    <div class="hero-foot">
      <div class="container">
        <div class="tabs is-centered">
          <ul>
            <li><a>And this is the bottom</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  margin: 3px;
}
label {
  display: inline-block;
  width: 100px;
}
</style>
