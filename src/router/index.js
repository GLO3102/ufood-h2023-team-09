import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant/:id",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
  },
  {
    path: "/log-in",
    name: "Log-in",
    component: () => import("@/components/Log-in"),
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: () => import("@/components/Sign-up"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
