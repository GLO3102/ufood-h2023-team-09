<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const signUp = () => {
  userStore.login();
  router.push("/");
};
</script>

<template>
  <section class="hero">
    <div class="hero-body has-text-centered">
      <div class="login">
        <h3 class="title has-text-black">Sign up</h3>
        <hr class="login-hr" />
        <p class="subtitle has-text-black">Please sign up to proceed.</p>
        <div class="box" id="loginBox">
          <form>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input is-medium"
                  type="username"
                  placeholder="Username"
                  autofocus="true"
                />
                <span class="icon is-small is-left">
                  <img src="@/assets/user.svg" width="20" />
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input is-medium"
                  type="email"
                  placeholder="Email"
                />
                <span class="icon is-small is-left">
                  <img src="@/assets/envelope.svg" width="20" />
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input is-medium"
                  type="password"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <img src="@/assets/lock.svg" width="20" />
                </span>
              </div>
            </div>
            <button
              class="button is-block is-info is-medium is-fullwidth"
              @click="signUp()"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#loginBox {
  min-width: 400px;
  max-width: 800px;
  margin: 0 auto;
}
.hero-body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
}
</style>
