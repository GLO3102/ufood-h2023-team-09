<template>
  <div class="hero" id="user-entire-page">
    <div class="hero-body">
      <!-- Begin user info-->
      <div>
        <nav class="level">
          <div class="level-item has-text-centered mb-5">
            <figure class="image">
              <img
                class="box is-rounded has-background-primary"
                :src="`https://api.dicebear.com/6.x/adventurer/svg?seed=${route.params.id}`"
                alt="UserPicture"
              />
            </figure>
          </div>
          <div class="level-item">
            <div class="is-6 is-offset-32 has-text-centered">
              <h1 class="title is-2 p-4">{{ user.name }}</h1>
              <h2
                class="subtitle is-1 has-text-primary has-text-weight-bold p-4"
              >
                {{ user.rating }}
              </h2>
              <button
                class="button is-primary m-1"
                @click="openFollowModal(true)"
              >
                Show followers
              </button>
              <button
                class="button is-primary m-1"
                @click="openFollowModal(false)"
              >
                Show following
              </button>
              <button
                v-if="!isSameUser && !isFollowing"
                class="button is-primary is-light m-1"
                @click="followUser"
              >
                Follow
              </button>
              <button
                v-if="!isSameUser && isFollowing"
                class="button is-primary is-light m-1"
                @click="unFollowUser"
              >
                Unfollow
              </button>
            </div>
          </div>
        </nav>
      </div>
      <!-- End user info-->
      <div class="container is-flex is-justify-content-center">
        <SearchUser />
      </div>

      <div>
        <!-- Begin Work Content IF USER HAVE VISITED RESTAURANTS-->
        <!--Carousel setting set on page-->
        <div v-if="!isVisitsEmpty" class="box my-5">
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
            <Slide v-for="visited in restoPicturesInfo" :key="visited">
              <div class="carousel__item">
                <UserRestaurantVisitedCard
                  :numberVisits="calculateNumberVisits(visited)"
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
        <div v-if="isVisitsEmpty" class="hero is-medium">
          <div class="box my-5">
            <div class="has-text-centered">
              <div>
                <h1 class="title is-2">
                  There is no visited restaurants<br />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste de liste de restaurants favories ou autre -->
      <FavoriteLists :userId="route.params.id" />
      <VisitedList :visits="userVisits" />
      <!-- Follow Modal -->
      <FollowModal
        :id="route.params.id"
        v-if="isFollowModalActive"
        @close="closeFollowModal"
        :is-followers="isFollowers"
      />
      <!-- End Work Content IF USER DONT VISIT-->
    </div>
  </div>
</template>

<script setup>
import SearchUser from "../components/userComponents/SearchUserComponent.vue";
import UserRestaurantVisitedCard from "@/components/userComponents/UserRestaurantVisitedCard.vue";
import FavoriteLists from "../components/userComponents/FavoriteLists.vue";
import VisitedList from "../components/userComponents/VisitedList.vue";
import "vue3-carousel/dist/carousel.css";
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";
import { getRestaurantByID } from "../api/restaurantApi";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { getUserVisits, getUserById } from "@/api/userApi.js";
import { followUserApi, unFollowUserApi } from "@/api/followApi.js";
import FollowModal from "../components/modals/FollowModal.vue";

const userStore = useUserStore();
const route = useRoute();
const isVisitsEmpty = ref(true);

//follow/unfollow button
const isSameUser = ref(false);
const isFollowing = ref(false);
onBeforeMount(() => {
  isSameUser.value = userStore.getUser().id === route.params.id;
  if (isSameUser.value) {
    isFollowing.value = false;
  } else {
    for (let i = 0; i < userStore.getUser().following.length; i++) {
      if (userStore.getUser().following[i].id === route.params.id) {
        isFollowing.value = true;
        break;
      }
    }
  }
});
async function followUser() {
  const res = await followUserApi(route.params.id, userStore.getUser().token);
  if (res.status === 201) {
    isFollowing.value = true;
  } else {
    alert("error in follow user");
  }
}
async function unFollowUser() {
  const res = await unFollowUserApi(route.params.id, userStore.getUser().token);
  if (res.status === 200) {
    isFollowing.value = false;
  } else {
    console.log(res);
    alert("error in unfollow user");
  }
}

//follow modal
const isFollowers = ref(true);
const isFollowModalActive = ref(false);
function openFollowModal(isFollower) {
  isFollowers.value = isFollower;
  isFollowModalActive.value = true;
}
function closeFollowModal() {
  isFollowModalActive.value = false;
}

//load user
const user = ref({
  id: "",
  name: "",
  email: "",
  rating: 0,
  followers: [],
  following: [],
});
onBeforeMount(async () => {
  user.value = await getUserById(userStore.getUser().token, route.params.id);
});

//load visits and resto info
const restoPicturesInfo = ref([]);
const userVisits = ref({
  items: [],
  total: 0,
});
onBeforeMount(async () => {
  userVisits.value = await getUserVisits(
    userStore.getUser().token,
    route.params.id
  );
  userVisits.value.forEach(async (visit) => {
    isVisitsEmpty.value = false;
    if (!restoPicturesInfo.value.includes(visit.restaurant_id)) {
      restoPicturesInfo.value.push(visit.restaurant_id);
    }
    const resto = await getRestaurantByID(visit.restaurant_id);
    visit["restoName"] = resto.name;
  });
});

function calculateNumberVisits(restaurantID) {
  let visitCounter = 0;

  userVisits.value.forEach((visit) => {
    if (visit.restaurant_id === restaurantID) {
      visitCounter++;
    }
  });

  return visitCounter;
}

//css settings
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
