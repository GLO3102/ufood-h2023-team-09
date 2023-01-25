<script setup>
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const userStore = useUserStore()
    const login = () => {
        userStore.login()
        router.push('/')
    }
</script>

<template>
    <section class="hero">
        <div class="hero-body has-text-centered">
            <div class="login">
                <h3 class="title has-text-black">Log in</h3>
                <hr class="login-hr">
                <p class="subtitle has-text-black">Please log in to proceed.</p>
                <div class="box" id="loginBox">
                    <figure class="avatar">
                        <img src="@/assets/person.svg" width="55">
                    </figure>
                    <form>
                        <div class="field">
                            <div class="control has-icons-left">
                                <input class="input is-medium" type="email" placeholder="Email" autofocus="true">
                                <span class="icon is-small is-left">
                                    <img src="@/assets/envelope.svg" width="20">
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left">
                                <input class="input is-medium" type="password" placeholder="Password">
                                <span class="icon is-small is-left">
                                    <img src="@/assets/lock.svg" width="20">
                                </span>
                            </div>
                        </div>
                        <button class="button is-block is-info is-medium is-fullwidth" @click="login()">Login</button>
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