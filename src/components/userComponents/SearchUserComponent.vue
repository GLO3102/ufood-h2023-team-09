<template>
  <div class="dropdown" id="big-container">
    <div class="dropdown-trigger">
      <input
        class="input is-primary"
        v-model="search"
        placeholder="search users"
      />
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <router-link
          :to="`/user/${user.id}`"
          :class="
            user.id === route.params.id
              ? 'dropdown-item is-active'
              : 'dropdown-item'
          "
          v-for="(user, index) in userSearched"
          :key="index"
        >
          {{ user.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../../stores/user";
import { useRoute } from "vue-router";
import { getUsersBySearch } from "../../api/userApi.js";

const userStore = useUserStore();
const userSearched = ref();
const route = useRoute();
const search = ref("");

watch(search, (newValue, oldValue) => {
  if (newValue === "" || newValue === null) {
    userSearched.value = null;
    document.getElementById("big-container").classList.remove("is-active");
    return;
  } else {
    document.getElementById("big-container").classList.add("is-active");
  }
  searchUser(newValue);
});

const searchUser = async (search) => {
  await getUsersBySearch(search, userStore.getUser().token)
    .then((res) => {
      userSearched.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeDropdownToActive = () => {
  if (
    document.getElementById("big-container").classList.contains("is-active")
  ) {
    document.getElementById("big-container").classList.remove("is-active");
    return;
  }
  document.getElementById("big-container").classList.add("is-active");
};
</script>
