<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white">
        <div class="container-fluid">
            <router-link class="navbar-brand font-weight-bold" to="/">TheQuestionsSpace</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                    <!-- Create Question -->
                    <li class="nav-item">
                        <router-link class="nav-link"  to="/">
                            <svg class="feather" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            Home
                        </router-link>
                    </li>

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto" v-if="this.loggedIn">

                    <!-- Create Question -->
                    <li class="nav-item">
                        <router-link class="nav-link"  to="/questions/question/create">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12" y2="17"></line></svg>
                            Ask People
                        </router-link>
                    </li>

                    <li class="nav-item dropdown" v-if="this.loggedIn">
                        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            {{ this.user.name }}
                        </a>
                        <div class="dropdown-menu">
                            <router-link class="dropdown-item" to="/profile">Profile</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" v-if="this.loggedIn" @click="this.logout">Logout</a>
                        </div>
                    </li>
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto" v-else>

                    <!-- Create Question -->
                    <li class="nav-item">
                        <router-link class="nav-link"  to="/questions/question/create">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12" y2="17"></line></svg>
                            Ask People
                        </router-link>
                    </li>

                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <router-link class="nav-link"  to="/login">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                            Login
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link"  to="/register">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            Register
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
    import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

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
            ...mapMutations('question', [
                'clearError'
            ]),

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
