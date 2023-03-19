#
<script>
import { defineComponent } from "vue";
import FavoriteLists from "./FavoriteLists.vue";
import FavoriteListModal from "./FavoriteListModal.vue";
import { getFavoriteListsByUserId } from "../api/favoriteListsApi";

export default defineComponent({
  data: () => {
    return {
      userLists: {},
      isInputReady: false,
    };
  },
  extends: FavoriteLists,
  components: {
    FavoriteListModal,
  },
  props: {
    userId: String,
    restoId: String,
    restoName: String,
  },
  methods: {},
  async created() {
    this.userLists = await getFavoriteListsByUserId(this.userId);
  },
});
</script>

<template>
  <div class="box">
    <div class="is-flex is-flex-direction-row is-justify-content-space-between">
      <div>
        <span class="title is-5">Add </span>
        <span class="title is-5"> {{ this.restoName }} </span>
        <span class="title is-5"> to a favorite list </span>
      </div>
      <div
        class="is-flex is-align-items-center is-justify-content-flex-end"
        style="padding-bottom: 20px"
      >
        <div class="tags has-addons">
          <a
            v-if="!isInputReady"
            @click="createNewList"
            class="button is-primary"
          >
            + Create a new list</a
          >
          <input
            v-if="isInputReady"
            ref="inputName"
            @focus="$event.target.select()"
            @keyup.enter="createNewList"
            type="text"
            class="tag title is-6"
          />
          <a v-if="isInputReady" @click="createNewList" class="tag title is-6"
            >Ok</a
          >
        </div>
      </div>
    </div>

    <div class="list">
      <FavoriteListModal
        v-for="list in userLists.items"
        :key="list.id"
        @move-up="moveUp"
        @move-down="moveDown"
        @delete-list="deleteList"
        :listId="list.id"
        :restoId="restoId"
      />
    </div>
  </div>
</template>

<style scoped>
.list {
  display: block;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.title.is-2 {
  text-align: center;
}
.tags.has-addons {
  justify-content: center;
}
</style>
