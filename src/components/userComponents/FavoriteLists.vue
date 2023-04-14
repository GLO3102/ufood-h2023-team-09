<template>
  <div class="box">
    <div class="title is-2 has-text-centered">Favorite Lists</div>
    <div class="title is-4 has-text-centered" v-if="isEmpty">There are no favorite list</div>
    <div class="tags has-addons">
      <a
        @click="createNewList"
        class="tag title is-6 has-background-grey-lighter"
        v-if="route.params.id === userStore.getUser().id"
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
<script>
import { defineComponent } from "vue";
import FavoriteList from "./FavoriteList.vue";
import {
  deleteFavoriteListById,
  createFavoriteList,
  addFavoriteListItem,
} from "../../api/favoriteListsApi";
import { getFavoriteListsByUserId } from "../../api/userApi";
import { useCookies } from "vue3-cookies";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/user";

export default defineComponent({
  data: () => {
    return {
      userLists: {},
      isInputReady: false,
      userStore: useUserStore(),
      route: useRoute(),
      isEmpty: true,
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
      const response = await deleteFavoriteListById(
        useUserStore().getUser().token,
        listId
      );
      this.userLists = await getFavoriteListsByUserId(
        useUserStore().getUser().token,
        this.userId
      );
      if (this.userLists.items.length === 0) this.isEmpty = true
      else this.isEmpty = false
    },
    async createNewList() {
      if (this.isInputReady) {
        let email = useUserStore().getUser().email;
        email = email.replace("/", "");
        let name = this.$refs.inputName.value;
        if (name.length > 0) {
          const response = await createFavoriteList(
            useUserStore().getUser().token,
            name,
            email
          );
          this.userLists = await getFavoriteListsByUserId(
            useUserStore().getUser().token,
            this.userId
          );
          this.isInputReady = false;
        }
      } else {
        this.isInputReady = true;
        this.$nextTick(() => {
          this.$refs.inputName.focus();
        });
      }
      if (this.userLists.items.length === 0) this.isEmpty = true
      else this.isEmpty = false
    },
    async moveUp(listId) {
      this.userLists = await getFavoriteListsByUserId(
        useUserStore().getUser().token,
        this.userId
      );
      if (listId !== this.userLists.items[0].id) {
        let temp = [];
        for (let i = this.userLists.items.length - 1; i >= 0; i--) {
          if (this.userLists.items[i].id !== listId) {
            temp.push(this.userLists.items[i]);
            await deleteFavoriteListById(
              useUserStore().getUser().token,
              this.userLists.items[i].id
            );
          } else {
            const upper = this.userLists.items[i - 1];
            await deleteFavoriteListById(
              useUserStore().getUser().token,
              upper.id
            );
            await this.addList(upper);
            for (let j = temp.length - 1; j >= 0; j--) {
              await this.addList(temp.pop());
            }
            break;
          }
        }
        this.userLists = await getFavoriteListsByUserId(
          useUserStore().getUser().token,
          this.userId
        );
      }
    },
    async moveDown(listId) {
      this.userLists = await getFavoriteListsByUserId(
        useUserStore().getUser().token,
        this.userId
      );
      if (listId !== this.userLists.items[this.userLists.items.length - 1].id) {
        let temp = [];
        for (let i = this.userLists.items.length - 1; i >= 0; i--) {
          if (this.userLists.items[i].id !== listId) {
            temp.push(this.userLists.items[i]);
            await deleteFavoriteListById(
              useUserStore().getUser().token,
              this.userLists.items[i].id
            );
          } else {
            const target = this.userLists.items[i];
            await deleteFavoriteListById(
              useUserStore().getUser().token,
              listId
            );
            await this.addList(temp.pop());
            await this.addList(target);
            for (let j = temp.length - 1; j >= 0; j--) {
              await this.addList(temp.pop());
            }
            break;
          }
        }
        this.userLists = await getFavoriteListsByUserId(
          useUserStore().getUser().token,
          this.userId
        );
      }
    },
    async addList(favoriteList) {
      const newList = await createFavoriteList(
        useUserStore().getUser().token,
        favoriteList.name,
        favoriteList.owner.email
      );
      for (const restaurant of favoriteList.restaurants) {
        await addFavoriteListItem(
          useUserStore().getUser().token,
          restaurant.id,
          newList.id
        );
      }
    },
  },
  async created() {
    if (this.userStore.getUser().token === '') {
      const { cookies } = useCookies()
      let token = cookies.get("ufood-token")
      if (token !== null) {
        await this.userStore.getToken(token)
      }
    }
    this.userLists = await getFavoriteListsByUserId(
      useUserStore().getUser().token,
      this.userId
    );
    if(this.userLists.items.length === 0) this.isEmpty = true
    else this.isEmpty = false
  },
});
</script>

<style scoped>
.list {
  display: block;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tags.has-addons {
  justify-content: center;
}
</style>
