<template>
    <div class="container my-3">
        <div class="row justify-content-center">
            <sidebar></sidebar>
            <div class="col-lg-8">
                <answer-card-component v-for="(answer, index) in this.user.stars" :key="index" :answer="answer"></answer-card-component>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions } from "vuex";
    import sidebar from "../../components/profile/SidebarMenuComponent";
    import AnswerCardComponent from "../../components/answers/AnswerCardComponent";


    export default {
        components: {sidebar, AnswerCardComponent},

        computed:{
            ...mapState('auth', [
                'user'
            ]),
        },
        methods: {
            ...mapActions('auth', [
                'getUser'
            ]),

            // removeAnswer(index){
            //     this.$delete(this.user.stars, index, 1);
            // },
        },

        mounted() {
            console.log('Component mounted.');

            this.getUser();
        }
    }
</script>
