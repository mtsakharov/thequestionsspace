<template>
    <div>
        <section class="jumbotron text-center text-white" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${this.question.image}'), center 40%`, backgroundSize: 'cover'}">
            <div class="container py-5">
                <h1 class="jumbotron-heading" style="font-family:Parfait Display,serif;">{{ question.body }}</h1>
            </div>
        </section>

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <create-question-answer-component @completed="pushAnswer" :question="this.question" :user="this.user"></create-question-answer-component>

                    <answer-card-component v-for="(answer, index) in question.answers" :key="index" :answer="answer"  @deleted="removeAnswer(index)"></answer-card-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    import CreateQuestionAnswerComponent from "../../components/answers/CreateQuestionAnswerComponent";
    import answerCardComponent from "../../components/answers/AnswerCardComponent";

    export default {
        components:{answerCardComponent, CreateQuestionAnswerComponent},

        computed:{
            ...mapState('question', [
                'question',
            ]),

            ...mapState('auth', [
                'user',
            ]),

            ...mapState('answer', [
                'errorMessage',
            ]),
        },

        methods: {
            ...mapActions('question', [
                'getQuestion',
            ]),

            pushAnswer(answer){
                this.question.answers.unshift(answer.data);
            },

            removeAnswer(index){
                this.$delete(this.question.answers, index, 1);
            },
        },

        mounted() {
            console.log('Component mounted.');

            this.getQuestion(this.$route.params.id);
        },
    }
</script>
