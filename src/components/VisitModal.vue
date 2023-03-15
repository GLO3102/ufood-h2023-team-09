<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column">
            <div>
              <span>Add a visit for : </span>
              <span class="has-text-weight-bold"> {{ name }}</span>
            </div>
            <span>Rating:</span>
            <input
              class="input"
              max="2023-03-15"
              type="date"
              v-model="visitDate"
            />
            <div>
              <span>Rating:</span>
              <input
                class="input"
                type="number"
                min="0"
                max="5"
                v-model="rating"
              />
            </div>
            <div>
              <span>Comment:</span>
              <textarea
                class="textarea has-fixed-size"
                placeholder="Add a comment"
                v-model="comment"
              ></textarea>
            </div>
            <div class="is-align-self-center mt-2">
              <button class="button is-primary" @click="save">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="close"></button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

import { postVisit } from "@/api/userApi.js";
const props = defineProps(["id", "name"]);
const emit = defineEmits(["close"]);
const visitDate = ref("");
const rating = ref(0);
const comment = ref("");
function close() {
  emit("close");
}
async function save() {
  const visit = {
    user_id: useUserStore().id,
    resto_id: props.id,
    visitDate: visitDate.value,
    rating: rating.value,
    comment: comment.value,
  };
  const res = await postVisit(visit);
  if (res.status === 201) {
    //afficher success
    console.log("success");
    close();
  } else {
    console.log("error");
    //afficher erreur
  }
}

const visitModalObject = {
  user_id: 1,
  resto_id: props.id,
  visitDate: "",
  rating: 0,
  comment: "",
};
</script>
<style scoped></style>
