<script setup>
    import { useUserStore } from '@/stores/user'
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const userStore = useUserStore()
    const signUp = () => {
        userStore.login()
        router.push('/')
    }
</script>

<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Sign up</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-black">Please sign up to proceed.</p>
                    <div class="box">
                        <form>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" type="username" placeholder="Username" autofocus="true">
                                    <span class="icon is-small is-left">
                                        <img src="@/assets/user.svg" width="20">
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left">
                                    <input class="input is-medium" type="email" placeholder="Email">
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
                            <button class="button is-block is-info is-medium is-fullwidth" @click="signUp()">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>