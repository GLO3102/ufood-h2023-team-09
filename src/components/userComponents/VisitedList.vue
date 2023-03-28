<template>
  <div>
    <div class="box">
      <div class="title is-2 has-text-centered">Visits</div>
      <div class="is-flex is-flex-direction-column is-align-items-center">
        <div
          class="pt-2 is-flex is-flex-direction-row is-justify-content-space-between w-full"
          v-for="(visit, index) in visits"
          :key="index"
        >
          <VisitModalReadOnly
            v-if="showVisitModal[index]"
            @close="closeVisitModal(index)"
            :visit="visit"
          />
          <div>
            <span class="has-text-weight-bold">{{ visit.restoName }}</span>
            <br />
            <span>{{ formatDate(visit.date) }}</span>
          </div>

          <button class="button is-primary" @click="openVisitModal(index)">
            View
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import VisitModalReadOnly from "../modals/VisitModalReadOnly.vue";

let showVisitModal = ref(Array(useUserStore().visitedNumber).fill(false));

const openVisitModal = (index) => {
  showVisitModal.value[index] = true;
};
const closeVisitModal = (index) => {
  showVisitModal.value[index] = false;
};

const props = defineProps(["visits"]);

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString();
}
const emit = defineEmits(["close"]);
</script>
<style>
.w-full {
  width: 100%;
}
</style>
