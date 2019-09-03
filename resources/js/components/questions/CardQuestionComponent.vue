<template>
    <router-link :to="'/questions/question/'+this.question.id">
        <div class="card mb-3">
            <div class="card-body text-center text-white py-5" data-filter="overlay-theme" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${this.question.image}'), center 40%`, backgroundSize: 'cover'}">
                <h4 class="card-title text-center my-5" style="font-family: 'Playfair Display', serif;">
                    {{ this.question.body }}
                </h4>
            </div>

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
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather text-dark"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            {{ this.question.views }}

                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather text-dark">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                            120
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: ["question"],

        mounted() {
            console.log('component mounted');
        }
    }
</script>
