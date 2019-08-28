<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">

                        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete ErrorMessage[$event.target.name]">


                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" v-model="email">


                                    <strong  v-if="ErrorMessage.email" class="">{{ ErrorMessage.email[0] }}</strong>

                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" name="password" class="form-control" v-model="password">


                                    <strong v-if="ErrorMessage.password" class="error">{{ ErrorMessage.password[0] }}</strong>

                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>



                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                    <a class="btn btn-link" href="">
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations } from "vuex";

    export default {
        name: "login",

        data() {
            return {
                email: "",
                password: "",
            };
        },

        computed: {
            ...mapState('auth', [
                'ErrorMessage',
                'ErrorCode'
            ]),

            ...mapGetters('auth', [
                'authenticating',
            ]),

            ...mapMutations('auth', [
                'clearError'
            ]),
        },

        mounted() {
            if (this.ErrorMessage !== ''){
                this.clearError();
            }
        },

        methods: {
            ...mapActions('auth',[
                'login',
                'getUser'
            ]),

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.login({email: this.email, password: this.password});

            },


        }
    };
</script>
