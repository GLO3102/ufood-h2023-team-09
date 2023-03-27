import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView"),
  },
  {
    path: "/restaurant/:id",
    name: "Restaurant",
    component: () => import("@/views/RestaurantView"),
  },
  {
    path: "/user/:id",
    name: "User",
    component: () => import("@/views/UserView"),
  },
  {
    path: "/log-in",
    name: "Log-in",
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: () => import("@/views/SignupView"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
