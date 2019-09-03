<template>
    <div class="">
        <section class="jumbotron text-center text-white" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${category.image}'), center 40%`, backgroundSize: 'cover'}">
            <div class="container py-5">
                <h1 class="jumbotron-heading" style="font-family:Parfait Display,serif;">{{ this.category.name }}</h1>
            </div>
        </section>

        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="row justify-content-center">
                    <CardQuestionComponent class="col-lg-12" v-for="(question, index) in this.category.questions" :key="index" :question="question"></CardQuestionComponent>
                </div>
            </div>
        </div>
    </div>
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
