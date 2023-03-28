<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column">
            <div
              v-if="props.isFollowers"
              class="is-size-4 is-align-self-center"
            >
              Followers
            </div>
            <div v-else class="is-size-4 is-align-self-center">Following</div>

            <router-link
              :to="`/user/${item.id}`"
              v-for="item in followList"
              :key="item"
            >
              <div class="is-size-5">{{ item.name }}</div>
              <div class="is-size-6">{{ item.email }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="close"></button>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { getUserById } from "../../api/userApi";
const followList = ref([]);

onBeforeMount(async () => {
  let user = await getUserById(props.id);
  if (props.isFollowers) {
    followList.value = user.followers;
  } else {
    followList.value = user.following;
  }
});

const emit = defineEmits(["close"]);

const props = defineProps(["id", "isFollowers"]);

function close() {
  emit("close");
}
</script>
<style scoped></style>
