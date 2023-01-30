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
      <!-- Begin user info-->
      <div>
        <nav class="level">
          <div class="level-item has-text-centered">
          <figure class="image is-4by4">
              <img
                class="is-rounded"
                src="https://i.pinimg.com/originals/05/11/45/051145a8e366876f859378154aa7df8b.jpg"
                alt="UserPicture"
              />
            </figure>
          </div>
          
            <div class="level-item">
            <div class="is-6 is-offset-32 has-text-centered">
            <h1 class="title is-2">User Name<br></h1>
            <h2 class="subtitle is-4">
              <br>This is user' score
            </h2>
          </div>
        </div>
        </nav> 
      </div>
      <!-- End user info-->
      <!-- Begin Work Content IF USER HAVE VISITED RESTAURANTS-->
      <Carousel wrap-around="true" :items-to-show="2.5">
        <Slide :key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-3by5">
                <img
                  src="https://i.pinimg.com/564x/c5/1a/41/c51a41fad6717db9106f0f2a89a2ea00.jpg"
                  alt=""/>
              </figure>
            </div>
            <div class="card-content is-overlay">
              <span class="tag is-primary">Number of visits</span>
            </div>
            <div class="card-content slider-text">
              <div class="is-size-5 box">IMAGE_CAPTION_HERE</div>
            </div>
          </div>
        </Slide>
        <Slide :key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-3by5">
                <img
                  src="https://i.pinimg.com/564x/08/25/38/082538afc45124898e4a792a5250d352.jpg"
                  alt=""/>
              </figure>
            </div>
            <div class="card-content is-overlay">
              <span class="tag is-primary">Number of visits</span>
            </div>
            <div class="card-content slider-text">
              <div class="is-size-5 box">IMAGE_CAPTION_HERE</div>
            </div>
          </div>
        </Slide>
        <Slide :key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-3by5">
                <img
                  src="https://i.pinimg.com/564x/95/19/fb/9519fb6c2a9576b4017356c29fb15f93.jpg"
                  alt=""/>
              </figure>
            </div>
            <div class="card-content is-overlay">
              <span class="tag is-primary">Number of visits</span>
            </div>
            <div class="card-content slider-text">
              <div class="is-size-5 box">IMAGE_CAPTION_HERE</div>
            </div>
          </div>
        </Slide>
        <Slide :key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-3by5">
                <img
                  src="https://i.pinimg.com/564x/9f/2f/6b/9f2f6bd333752f91e23514ea1a946e3c.jpg"
                  alt=""/>
              </figure>
            </div>
            <div class="card-content is-overlay">
              <span class="tag is-primary">Number of visits</span>
            </div>
            <div class="card-content slider-text">
              <div class="is-size-5 box">IMAGE_CAPTION_HERE</div>
            </div>
          </div>
        </Slide>
        <Slide :key="slide">
          <div class="carousel__item">
            <div class="card">
              <figure class="image is-3by5">
                <img
                  src="https://i.pinimg.com/564x/98/10/2c/98102cbaf0d75501f968ece02a83482f.jpg"
                  alt=""/>
              </figure>
            </div>
            <div class="card-content is-overlay">
              <span class="tag is-primary">Number of visits</span>
            </div>
            <div class="card-content slider-text">
              <div class="is-size-5 box">IMAGE_CAPTION_HERE</div>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <!-- End Work Content IF USER HAVE VISITED RESTAURANTS-->
      <!-- Begin Work Content IF USER DONT VISIT//GOTTA SHOW INDICATION OF NON VISITED AND LINK TO HOME PAGE-->
      <!-- End Work Content IF USER DONT VISIT-->
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
