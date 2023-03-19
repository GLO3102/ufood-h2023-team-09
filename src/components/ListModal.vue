<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column">
            <div
              class="is-flex is-flex-direction-row is-justify-content-space-between"
            ></div>
            <FavoriteListsModal
              :userId="userId"
              :restoId="props.id"
              :restoName="props.name"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="close"></button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import FavoriteListsModal from "./FavoriteListsModal.vue";
import "vue3-carousel/dist/carousel.css";

const userId = ref("619c57e4fe6e16000458adf4");
const props = defineProps(["id", "name"]);
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>
<style scoped></style>
