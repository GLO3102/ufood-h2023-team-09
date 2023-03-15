import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    isLoggedIn: false,
    id:"id",
    name: "name",
    email:"email",
    rating: 170,
    following: [],
    followers: [],
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
});
