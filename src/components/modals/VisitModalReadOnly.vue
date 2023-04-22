<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column">
            <div
              class="is-flex is-flex-direction-row is-justify-content-space-between"
            >
              <div>
                <span>Visit for : </span>
                <span
                  class="has-text-weight-bold is-clickable"
                  @click="$router.push(`/restaurant/${visit.restaurant_id}`)"
                  >{{ visit.restoName }}</span
                >
              </div>
            </div>
            <span>Date:</span>
            <input
              class="input"
              max="2023-03-15"
              type="date"
              :value="formatDate(visit.date)"
              disabled
            />
            <div>
              <span>Rating:</span>
              <input
                class="input"
                type="number"
                min="0"
                max="5"
                :value="visit.rating"
                disabled
              />
            </div>
            <div>
              <span>Comment:</span>
              <textarea
                class="textarea has-fixed-size"
                placeholder="No comment"
                :value="visit.comment"
                disabled
              ></textarea>
            </div>
            <div class="is-align-self-center mt-2">
              <button class="button is-primary" @click="close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="close"></button>
  </div>
</template>
<script setup>
const props = defineProps(["visit"]);
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>
<style scoped></style>
