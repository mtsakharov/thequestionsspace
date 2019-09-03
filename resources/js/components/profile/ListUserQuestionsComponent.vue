<template>
    <div>
        <div class="py-2" v-for="question in this.user.questions">
            <router-link :to="'/questions/question/'+question.id">
                <div class="card rounded-4">
                    <div class="card-body text-center text-white py-5" data-filter="overlay-theme" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${question.image}'), center 40%`, backgroundSize: 'cover'}">
                        <h4 class="card-title text-center my-5" style="font-family:Playfair-Display;">
                            {{ question.body }}
                        </h4>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="row">
                            <div class="d-flex col-9">
                                <img class="rounded-circle mr-2 p-0 border-light" src="https://www.getreplacer.com/images/photo-04.jpg" height="40">
                                <div class="small">
                                    <p class="card-link text-dark m-1 p-0">{{ user.name }}</p>

                                    <p class="text-secondary m-1 p-0">Last updated 3 mins ago</p>
                                </div>
                            </div>
                            <div class="col-3 text-align-right">
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex';

    export default {
        computed:{
            ...mapState('auth', [
                'user',
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
