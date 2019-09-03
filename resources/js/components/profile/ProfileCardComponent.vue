<template>
    <div class="card card-profile-large text-center">
        <div class="card-body">
            <a href="#">
                <img :alt="this.user.name" :src="this.user.avatar" class="avatar avatar-lg">
            </a>
            <div class="my-3">
                <div class="mb-2">
                    <h5 class="mb-0">{{ user.name }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions } from "vuex";

    export default {
        computed:{
            ...mapState('auth', [
                'user'
            ]),
        },
        methods: {
            ...mapActions('auth', [
                'getUser'
            ]),
        },

        mounted() {
            console.log('Component mounted.');

            this.getUser();
        }
    }
</script>
