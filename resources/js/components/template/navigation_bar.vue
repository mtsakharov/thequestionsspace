<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <router-link class="navbar-brand" to="/">Laravel</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    <li class="nav-item active">
                        <router-link class="nav-link" v-if="loggedIn === false" to="/login">Login</router-link>
                    </li>

                    <li class="nav-item active">
                        <router-link class="nav-link" v-if="loggedIn === false" to="/register">Register</router-link>
                    </li>

                    <li class="nav-item dropdown" v-if="loggedIn">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">{{ user.name }}</a>
                        <div class="dropdown-menu">
                            <router-link class="dropdown-item" to="/profile">Profile</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" v-if="loggedIn" @click="logout()">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
    import { mapState, mapGetters, mapActions } from "vuex";

    export default {
        computed: {
            ...mapState('auth', [
                'user',
                'getUserError',
                'accessToken'
            ]),

            ...mapGetters('auth', [
                'loggedIn',
                'authenticating',
                'authenticationError',
                'authenticationErrorCode',
            ]),
        },

        methods: {
            ...mapActions('auth', [
                'login',
                'logout',
                'getUser'
            ]),
        },

        mounted() {
            console.log('Component mounted.');

            if (this.accessToken){
                this.getUser();
            }
        }
    }
</script>
