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
    setUser(user){
      this.isLoggedIn = true;
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.rating = user.rating;
      this.following = user.following;
      this.followers = user.followers;
    }
  },
});
