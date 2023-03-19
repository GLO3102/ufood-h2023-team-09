<script>
import { defineComponent } from "vue";
import FavoriteList from "./FavoriteList.vue";
import {
  getFavoriteListsByUserId,
  deleteFavoriteListById,
  createFavoriteList,
  addFavoriteListItem,
} from "../api/favoriteListsApi";

export default defineComponent({
  data: () => {
    return {
      userLists: {},
      isInputReady: false,
    };
  },
  components: {
    FavoriteList,
  },
  props: {
    userId: String,
  },
  methods: {
    async deleteList(listId) {
      const response = await deleteFavoriteListById(listId);
      this.userLists = await getFavoriteListsByUserId(this.userId);
    },
    async createNewList() {
      if (this.isInputReady) {
        let email = this.userLists.items[0].owner.email;
        email = email.replace("/", "");
        let name = this.$refs.inputName.value;
        if (name.length > 0) {
          const response = await createFavoriteList(name, email);
          this.userLists = await getFavoriteListsByUserId(this.userId);
          this.isInputReady = false;
        }
      } else {
        this.isInputReady = true;
        this.$nextTick(() => {
          this.$refs.inputName.focus();
        });
      }
    },
    async moveUp(listId) {
      if (listId !== this.userLists.items[0].id) {
        let temp = [];
        for (let i = this.userLists.items.length - 1; i >= 0; i--) {
          if (this.userLists.items[i].id !== listId) {
            temp.push(this.userLists.items[i]);
            await deleteFavoriteListById(this.userLists.items[i].id);
          } else {
            const upper = this.userLists.items[i - 1];
            await deleteFavoriteListById(upper.id);
            await this.addList(upper);
            for (let j = temp.length - 1; j >= 0; j--) {
              await this.addList(temp.pop());
            }
            break;
          }
        }
        this.userLists = await getFavoriteListsByUserId(this.userId);
      }
    },
    async moveDown(listId) {
      if (listId !== this.userLists.items[this.userLists.items.length - 1].id) {
        let temp = [];
        for (let i = this.userLists.items.length - 1; i >= 0; i--) {
          if (this.userLists.items[i].id !== listId) {
            temp.push(this.userLists.items[i]);
            await deleteFavoriteListById(this.userLists.items[i].id);
          } else {
            const target = this.userLists.items[i];
            await deleteFavoriteListById(listId);
            await this.addList(temp.pop());
            await this.addList(target);
            for (let j = temp.length - 1; j >= 0; j--) {
              await this.addList(temp.pop());
            }
            break;
          }
        }
        this.userLists = await getFavoriteListsByUserId(this.userId);
      }
    },
    async addList(favoriteList) {
      const newList = await createFavoriteList(
        favoriteList.name,
        favoriteList.owner.email
      );
      for (const restaurant of favoriteList.restaurants) {
        await addFavoriteListItem(restaurant.id, newList.id);
      }
    },
  },
  async created() {
    this.userLists = await getFavoriteListsByUserId(this.userId);
  },
});
</script>

<template>
  <div class="box">
    <div class="title is-2">Favorite Lists</div>
    <div class="tags has-addons">
      <a
        @click="createNewList"
        class="tag title is-6 has-background-grey-lighter"
        >Create a new list</a
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
    <div class="list">
      <FavoriteList
        v-for="list in userLists.items"
        :key="list.id"
        @move-up="moveUp"
        @move-down="moveDown"
        @delete-list="deleteList"
        :listId="list.id"
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
