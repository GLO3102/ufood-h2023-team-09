<template>
  <div class="card">
    <div class="card-header">
      <div class="list-name" v-if="!isInputReady">{{ list.name }}</div>
      <input
        ref="rename"
        @focus="$event.target.select()"
        :id="list.id"
        @keyup.enter="modifyName($event)"
        v-if="isInputReady"
        type="text"
        v-model="list.name"
        class="tag is-small"
      />
      <div class="tags has-addons">
        <a
          v-if="!isInputReady && isOptionsReady"
          class="tag is-small has-background-grey-lighter"
          @click="$emit('moveUp', listId)"
          >&#8593;</a
        >
        <a
          v-if="!isInputReady && isOptionsReady"
          class="tag is-small has-background-grey-lighter"
          @click="$emit('moveDown', listId)"
          >&#8595;</a
        >
        <a
          v-if="isOptionsReady"
          @click="modifyName($event)"
          class="tag is-small has-background-grey-lighter"
          >Rename</a
        >
        <a
          v-if="!isInputReady && isOptionsReady"
          @click="$emit('deleteList', listId)"
          class="tag is-small is-danger"
          >Delete</a
        >
        <a
          v-if="route.params.id === userStore.getUser().id"
          @click="toggleOptions"
          class="tag is-small has-background-grey-lighter"
          >&#8226;&#8226;&#8226;</a
        >
      </div>
    </div>
    <div class="card-content">
      <FavoriteListItem
        @remove-item="removeItem"
        @move-up="moveUp"
        @move-down="moveDown"
        v-for="item in list.restaurants"
        :key="item.id"
        :restaurant-id="item.id"
      />
      <a
        v-if="route.params.id === userStore.getUser().id"
        @click="$router.push('/')"
        class="tag is-small has-background-grey-lighter"
        >Add a restaurant</a
      >
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/user";
import { defineComponent } from "vue";
import FavoriteListItem from "./FavoriteListItem.vue";
import {
  getFavoriteListById,
  removeFavoriteListItem,
  modifyFavoriteList,
  addFavoriteListItem,
} from "../../api/favoriteListsApi";

export default defineComponent({
  name: "FavoriteList",
  data: () => {
    return {
      list: [Object],
      isInputReady: false,
      isOptionsReady: false,
      userStore: useUserStore(),
      route: useRoute(),
      isRestoAdded: false,
    };
  },
  components: {
    FavoriteListItem,
  },
  props: {
    listId: String,
  },
  emits: ["deleteList", "moveUp", "moveDown"],
  methods: {
    toggleOptions() {
      if (this.isOptionsReady) this.isInputReady = false;
      this.isOptionsReady = !this.isOptionsReady;
    },
    async removeItem(restaurantId) {
      const response = await removeFavoriteListItem(
        useUserStore().getUser().token,
        restaurantId,
        this.listId
      );
      this.list = await getFavoriteListById(
        useUserStore().getUser().token,
        this.listId
      );
      this.isRestoAdded = false;
    },
    async modifyName(event) {
      if (this.isInputReady) {
        if (this.list.name.length !== 0) {
          const response = await modifyFavoriteList(
            useUserStore().getUser().token,
            this.list.name,
            this.list.owner.email,
            this.list.id
          );
          this.list = await getFavoriteListById(
            useUserStore().getUser().token,
            this.listId
          );
          this.isInputReady = false;
        } else {
          this.$nextTick(() => {
            this.$refs.rename.focus();
          });
        }
      } else {
        this.isInputReady = true;
        if (event) {
          this.$nextTick(() => {
            this.$refs.rename.focus();
          });
        }
      }
    },
    async moveUp(restaurantId) {
      this.list = await getFavoriteListById(
        useUserStore().getUser().token,
        this.listId
      );
      if (restaurantId !== this.list.restaurants[0].id) {
        let temp = [];
        for (let i = this.list.restaurants.length - 1; i >= 0; i--) {
          if (this.list.restaurants[i].id !== restaurantId) {
            temp.push(this.list.restaurants[i].id);
            await removeFavoriteListItem(
              useUserStore().getUser().token,
              this.list.restaurants[i].id,
              this.list.id
            );
          } else {
            const upper = this.list.restaurants[i - 1].id;
            await removeFavoriteListItem(
              useUserStore().getUser().token,
              upper,
              this.list.id
            );
            await addFavoriteListItem(
              useUserStore().getUser().token,
              upper,
              this.list.id
            );
            for (let j = temp.length - 1; j >= 0; j--) {
              await addFavoriteListItem(
                useUserStore().getUser().token,
                temp.pop(),
                this.list.id
              );
            }
            break;
          }
        }
        this.list = await getFavoriteListById(
          useUserStore().getUser().token,
          this.listId
        );
      }
    },
    async moveDown(restaurantId) {
      this.list = await getFavoriteListById(
        useUserStore().getUser().token,
        this.listId
      );
      if (
        restaurantId !==
        this.list.restaurants[this.list.restaurants.length - 1].id
      ) {
        let temp = [];
        for (let i = this.list.restaurants.length - 1; i >= 0; i--) {
          if (this.list.restaurants[i].id !== restaurantId) {
            temp.push(this.list.restaurants[i].id);
            await removeFavoriteListItem(
              useUserStore().getUser().token,
              this.list.restaurants[i].id,
              this.list.id
            );
          } else {
            await removeFavoriteListItem(
              useUserStore().getUser().token,
              restaurantId,
              this.list.id
            );
            await addFavoriteListItem(
              useUserStore().getUser().token,
              temp.pop(),
              this.list.id
            );
            await addFavoriteListItem(
              useUserStore().getUser().token,
              restaurantId,
              this.list.id
            );
            for (let j = temp.length - 1; j >= 0; j--) {
              await addFavoriteListItem(
                useUserStore().getUser().token,
                temp.pop(),
                this.list.id
              );
            }
            break;
          }
        }
        this.list = await getFavoriteListById(
          useUserStore().getUser().token,
          this.listId
        );
      }
    },
  },
  async created() {
    this.list = await getFavoriteListById(
      useUserStore().getUser().token,
      this.listId
    );
  },
});
</script>
<style scoped>
.card-header {
  padding: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list-name {
  max-width: 100%;
  overflow-wrap: break-word;
}
.card {
  width: 480px;
  margin-inline: 1vw;
  margin-bottom: 2vw;
  flex-shrink: 1;
}
</style>
