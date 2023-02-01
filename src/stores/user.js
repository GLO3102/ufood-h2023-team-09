import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        isLoggedIn: false,
        username: "alexprudhomme",
        favoriteRestaurants: ['McDonalds', 'Burger King', 'Wendys'],
    }),
    actions: {
        login() {
            this.isLoggedIn = true;
        },
        logout() {
            this.isLoggedIn = false;
        }
    }
});           