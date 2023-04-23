<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column">
            <div class="is-flex is-flex-direction-row is-justify-content-space-between">
              <div>
                <span>Add a visit for : </span>
                <span class="has-text-weight-bold"> {{ name }} </span>
              </div>
            </div>
            <span>Date:<a style="color:red">*</a></span>
            <input class="input" :max="`${year}-${month}-${date}`" type="date" v-model="visitDate" />
            <div>
              <span>Rating:<a style="color:red">*</a></span>
              <input class="input" type="number" min="0" max="5" v-model="rating" />
            </div>
            <div>
              <span>Comment:</span>
              <textarea class="textarea has-fixed-size" placeholder="Add a comment" v-model="comment"></textarea>
            </div>
            <div class="is-align-self-center mt-2">
              <button class="button is-primary" @click="save">Save</button>
            </div>
            <div class="is-align-self-center">
              <span class="has-text-success" v-if="isSuccess">Success</span>
              <span class="has-text-danger" v-if="isError">All * sections must be completed correctly</span>
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

const today = new Date();
let date = today.getDate().toString();
if (date.length === 1) date = `0${date}`;
let month = (today.getMonth() + 1).toString();
if (month.length === 1) month = `0${month}`;
const year = today.getFullYear().toString();

const userStore = useUserStore();
const isSuccess = ref(false);
const isError = ref(false);
const errorValue = ref("");
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
    user_id: userStore.getUser().id,
    resto_id: props.id,
    visitDate: visitDate.value,
    rating: rating.value,
    comment: comment.value,
  };
  if (visitDate.value.length !== 0 && rating.value >= 1  && rating.value <= 5 ) {
    const res = await postVisit(userStore.getUser().token, visit);
    if (res.status === 201) {
      isSuccess.value = true;
      isError.value = false;
      setTimeout(() => {
        close();
      }, 750);
    } else {
      isError.value = true;
      isSuccess.value = false;
      const errorData = await res.json();
      errorValue.value = errorData.message;
    }
  } else isError.value = true;
}
</script>
<style scoped></style>
