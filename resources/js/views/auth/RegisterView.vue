<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete ErrorMessage[$event.target.name]">

                            <div class="form-group row">
                                <label for="name" class="col-sm-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" v-model="name">

                                    <strong v-if="ErrorMessage.name" class="error">{{ ErrorMessage.name[0] }}</strong>

                                    <span class="invalid-feedback" role="alert">
                                        <strong></strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" v-model="email" >

                                    <strong v-if="ErrorMessage.email" class="error">{{ ErrorMessage.email[0] }}</strong>

                                    <span class="invalid-feedback">

                                    </span>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control"  name="password" v-model="password" >

                                    <strong v-if="ErrorMessage.password" class="error">{{ ErrorMessage.password[0] }}</strong>

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
    import { mapState, mapGetters, mapActions, mapMutations} from "vuex";
    export default {
        name: "register",

        mounted() {
            if (this.ErrorMessage !== ''){
                this.clearError();
            }
        },

        data() {
            return {
                name: "",
                email: "",
                password: "",
            };
        },

        computed: {
            ...mapState('auth', [
                'ErrorMessage',
                'ErrorCode'
            ]),

            ...mapMutations('auth', [
                'clearError'
            ]),
        },

        methods: {
            ...mapActions('auth', [
                'register',
            ]),

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.register({name: this.name, email: this.email, password: this.password});
            },
        }
    };
</script>
