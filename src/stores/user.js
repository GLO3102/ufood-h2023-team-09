import { defineStore } from "pinia";
import {ref, ssrContextKey } from "vue";
import { loginApi, signupApi, logoutApi } from "../api/authApi";


export const useUserStore = defineStore("user", () =>{

  const id = ref("");
  const name = ref("");
  const email = ref("");
  const followers = ref([]);
  const following = ref([]);
  const token = ref("");
  const rating = ref(0);
  const isLoggedIn = ref(false);

  const getUser = () => {
    return {
      id: id.value,
      name: name.value,
      email: email.value,
      followers: followers.value,
      following: following.value,
      token: token.value,
      rating: rating.value,
    };
  };
  const getIsLoggedIn = () => {
    return isLoggedIn.value;
  };
  const create = (user) => {
    id.value = user.id;
    name.value = user.name;
    email.value = user.email;
    followers.value = user.followers;
    following.value = user.following;
    token.value = user.token;
    rating.value = user.rating;
    isLoggedIn.value = true;
  };
  const login = async (email, password) => {
    const res = await loginApi(email, password);
    if (res.status !== 200) {
      console.log(res.status);
      return false;
    }else{
      const user = await res.json();
      create(user);
      return true;
    }
  };
  const signup = async (name, email, password) => {
    const res = await signupApi(name, email, password);
    if (res.status !== 200) {
      console.log(res.status);
      return false;
    }else{
      const user = await res.json();
      create(user);
      return true;
    }
  };

  const logout = async () => {
    const res = await logoutApi();
    if (res.status !== 200) {
      console.log(res.status);
      return false;
    }else{
      id.value = "";
      name.value = "";
      email.value = "";
      followers.value = [];
      following.value = [];
      token.value = "";
      rating.value = 0;
      isLoggedIn.value = false;
      return true;
    }
  };

  return {getUser, create, login, signup, logout, getIsLoggedIn}

});
