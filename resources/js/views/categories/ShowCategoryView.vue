<template>
    <show-category-view>
        <section class="col-lg-12 jumbotron text-center text-white" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${this.category.image}'), center 40%`, backgroundSize: 'cover'}">
            <div class="container py-5">
                <h1 class="jumbotron-heading" style="font-family:Parfait Display,serif;">{{ category.name }}</h1>
            </div>
        </section>


        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <card-question-component v-for="(question, index) in this.category.questions" :key="index" :question="question"></card-question-component>
                </div>
            </div>
        </div>


    </show-category-view>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import CardQuestionComponent from "../../components/questions/CardQuestionComponent";

    export default {
        components: {CardQuestionComponent},

        computed:{
            ...mapState('category', [
                'category',
            ]),
        },

        methods: {
            ...mapActions('category', [
                'getCategory',
            ]),
        },

        mounted() {
            this.getCategory(this.$route.params.id);
        }
    }
</script>
