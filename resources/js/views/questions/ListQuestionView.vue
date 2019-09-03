<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="row justify-content-center">
                    <CardQuestionComponent class="col-lg-12" v-for="(question, index) in this.questions" :key="index" :question="question"></CardQuestionComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex';
    import CardQuestionComponent from "../../components/questions/CardQuestionComponent";

    export default {
        components: {CardQuestionComponent},

        computed:{
            ...mapState('question',[
                'questions'
            ]),
        },

        methods:{
            ...mapActions('question', [
                'getQuestions'
            ]),
        },

        mounted() {
            this.getQuestions();
        }
    }
</script>
