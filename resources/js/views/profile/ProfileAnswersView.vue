<template>
    <div class="container my-3">
        <div class="row justify-content-center">
            <sidebar></sidebar>
            <div class="col-lg-8">
                <list-question-answers-component v-for="(answer, index) in this.user.answers" :key="index" :answer="answer"  @deleted="removeAnswer(index)"></list-question-answers-component>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions } from "vuex";
    import sidebar from "../../components/profile/SidebarMenuComponent";
    import ListQuestionAnswersComponent from "../../components/answers/ListQuestionAnswersComponent";


    export default {
        components: {sidebar, ListQuestionAnswersComponent},

        computed:{
            ...mapState('auth', [
                'user'
            ]),
        },
        methods: {
            ...mapActions('auth', [
                'getUser'
            ]),

            removeAnswer(index){
                this.$delete(this.user.answers, index, 1);
            },
        },

        mounted() {
            console.log('Component mounted.');

            this.getUser();
        }
    }
</script>
