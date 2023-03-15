<template>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column">
            <div>
              <span>Add a visit for :</span>
              <span> name of resto</span>
            </div>
            <span>Rating:</span>
            <input
              class="input"
              max="2023-03-15"
              type="date"
              value="visitDate"
            />
            <div>
              <span>Rating:</span>
              <input
                class="input"
                type="number"
                min="0"
                max="5"
                value="rating"
              />
            </div>
            <div>
              <span>Comment:</span>
              <textarea
                class="textarea has-fixed-size"
                placeholder="Add a comment"
              ></textarea>
            </div>
            <div class="is-align-self-center mt-2">
              <button class="button is-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="close"></button>
  </div>
</template>
<script setup>
const emit = defineEmits(["close"]);
function close() {
  console.log("close");
  emit("close");
}
</script>
<style scoped>
.template {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grey-background {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  height: 100%;
  width: 100%;
}
.card-thing {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 1.25rem;
  width: 640px;
  max-width: 640px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.375rem;
}
.second-thing {
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  max-width: 100%;
}
.third-thing {
  width: 100%;
  border-radius: 0.375rem;
  height: 3rem;
  background-color: var(--input-color);
  padding-left: 1rem;
}
.fourth-thing {
  z-index: 2;
  outline: none;
  background-color: var(--input-color);
  border: none;
  box-sizing: border-box;
  height: 3rem;
}
</style>
