<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Homepage Component</div>

                    <div class="card-body">
                        I'm an homepage component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        methods: {
            ...mapState('auth', [
                'accessToken'
            ]),
            ...mapActions('auth', [
                'getUser'
            ]),
        },

        mounted() {
            console.log('Component mounted.');

            if(this.accessToken){
                this.getUser();
            }
        },
    }
</script>
