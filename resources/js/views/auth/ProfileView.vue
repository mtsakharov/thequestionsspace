<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Profile Component</div>

                    <div class="card-body">
                        {{ user.name }}
                    </div>
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
