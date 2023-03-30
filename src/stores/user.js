import { defineStore } from "pinia";
import {ref, watch} from "vue";
import { loginApi, signupApi, logoutApi, getTokenApi } from "../api/authApi";
import { useCookies } from "vue3-cookies";


export const useUserStore = defineStore('user', () => {
  const { cookies } = useCookies();
  const user = ref({
    id: "",
    name: "",
    email: "",
    followers: [],
    following: [],
    token: "",
    rating: 0,
    isLoggedIn: false,
  });

  watch(user, (newUser) => {
    cookies.set("ufood-token", user.value.token);
  },
  {deep: true});

  const getUser = () => {
    return user.value
  };
  const getIsLoggedIn = () => {
    return user.value.isLoggedIn;
  };
  const create = (_user) => {
    user.value = _user;
    user.value.isLoggedIn = true;
  };
  const getToken = async (token) =>{
    const res = await getTokenApi(token);
    if (res.status !== 200) {
      return false;
    }else{
      const user = await res.json();
      create(user);
      return true;
    }
  }

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    if (res.status !== 200) {
      return res;
    }else{
      const user = await res.json();
      create(user);
      return res;
    }
  };
  const signup = async (name, email, password) => {
    const res = await signupApi(name, email, password);
    if (res.status !== 200) {
      return res;
    }else{
      const user = await res.json();
      create(user);
      return res;
    }
  };

  const logout = async () => {
    const res = await logoutApi();
    if (res.status !== 200) {
      console.log(res.status);
      return false;
    }else{
      user.value.id = "";
      user.value.name = "";
      user.value.email = "";
      user.value.followers = [];
      user.value.following = [];
      user.value.token = "";
      user.value.rating = 0;
      user.value.isLoggedIn = false;
      return true;
    }
  };

  return {getUser, create, login, signup, logout, getIsLoggedIn, getToken}

});
