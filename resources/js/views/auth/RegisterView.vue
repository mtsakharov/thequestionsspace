<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 py-5">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete registerError[$event.target.name]">

                            <div class="form-group row">
                                <label for="name" class="col-sm-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" v-model="name">

                                    <strong v-if="registerError.name" class="error">{{ registerError.name[0] }}</strong>

                                    <span class="invalid-feedback" role="alert">
                                        <strong></strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" v-model="email" >

                                    <strong v-if="registerError.email" class="error">{{ registerError.email[0] }}</strong>

                                    <span class="invalid-feedback">

                                    </span>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control"  name="password" v-model="password" >

                                    <strong v-if="registerError.password" class="error">{{ registerError.password[0] }}</strong>

                                    <span class="invalid-feedback" >
                                    </span>
                                </div>

                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">`
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
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
    import { mapState, mapGetters, mapActions} from "vuex";
    export default {
        name: "register",

        data() {
            return {
                name: "",
                email: "",
                password: "",
            };
        },

        computed: {
            ...mapState('auth', [
                'registerError',
                'registerErrorCode'

            ]),

            ...mapGetters('auth', [
                'authenticating',
                'registerError',
                'registerErrorCode'
            ]),

        },

        methods: {
            ...mapActions('auth', [
                'register',
                'logout',
            ]),

            handleSubmit() {

                    // Perform a simple validation that email and password have been typed in
                    this.register({name: this.name, email: this.email, password: this.password});

            },
        }
    };
</script>
