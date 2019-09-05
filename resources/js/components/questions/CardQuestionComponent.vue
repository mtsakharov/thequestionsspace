<template>
        <div class="card mb-3">
            <router-link :to="'/questions/question/'+this.question.id">

            <div class="card-body text-center text-white py-5" data-filter="overlay-theme" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${this.question.image}'), center 40%`, backgroundSize: 'cover'}">
                <h4 class="card-title text-center my-5" style="font-family: 'Playfair Display', serif;">
                    {{ this.question.body }}
                </h4>
            </div>
            </router-link>

            <div class="card-footer border-0 delimiter-top">
                <div class="d-flex align-items-center">
                    <div>
                        <img v-bind:src="this.question.user.avatar" alt="" class="rounded-circle mr-2 p-0 border-light" height="55" >
                    </div>
                    <div>
                        <p class="card-text text-dark m-1 p-0">{{ this.question.user.name }}</p>
                        <p class="text-secondary m-1 p-0">In {{ this.question.category.name }}</p>
                    </div>
                    <div class="ml-auto">
                        <div class="actions text-dark">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather text-dark">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            {{ this.question.views }}

                            <bookmark-component v-if="this.loggedIn" :question="this.question" :user="this.user"></bookmark-component>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
    import {mapState, mapGetters} from "vuex";

    import BookmarkComponent from "./BookmarkComponent";
    export default {
        components: {BookmarkComponent},
        props: ["question"],

        computed:{
            ...mapState('auth', [
                'user'
            ]),
            ...mapGetters('auth', [
                'loggedIn'
            ])
        },

        mounted() {
            console.log('component mounted');
        }
    }
</script>
