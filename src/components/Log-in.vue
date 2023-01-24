<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Log in</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-black">Please log in to proceed.</p>
                    <div class="box">
                        <figure class="avatar">
                            <img src="@/assets/person.svg" width="50">
                        </figure>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" type="email" placeholder="Email" autofocus="true">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" type="password" placeholder="Password">
                                </div>
                            </div>
                            <button class="button is-block is-info is-medium is-fullwidth">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>