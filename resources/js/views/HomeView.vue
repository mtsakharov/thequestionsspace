<template>
    <div class="container py-3">
        <div class="row">
            <div class="row">
                <div class="col-12 mb-4">
                    <h4 class="font-weight-bold">Categories<span class="badge badge-light badge-pill ml-2">{{ this.categories.length }}</span></h4>
                </div>
                <CategoryCardComponent v-for="(category, index) in this.categories.slice(0,6)" :key="index" :category="category"></CategoryCardComponent>
            </div>

            <div class="row py-5">
                <div class="col-lg-7">
                    <div class="col-12 mb-4">
                        <h4 class="font-weight-bold">Questions<span class="badge badge-light badge-pill ml-2">{{ this.questions.length }}</span></h4>
                    </div>
                    <CardQuestionComponent v-for="(question, index) in this.questions" :key="index" :question="question" :value="question"></CardQuestionComponent>

                    <load-more-component :url="next" @completed="pushQuestions"></load-more-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import CategoryCardComponent from "../components/categories/CategoryCardComponent";
    import CardQuestionComponent from "../components/questions/CardQuestionComponent";
    import LoadMoreComponent from "../components/questions/LoadMoreComponent";
    import ApiService from "../services/api.service";
    export default {
        components: {LoadMoreComponent, CategoryCardComponent, CardQuestionComponent},

        computed: {
            ...mapState('auth', [
                'accessToken'
            ]),
            ...mapState('category',[
                'categories'
            ]),

            ...mapState('question',[
                'questions',
                'links'
            ]),
        },

        data(){
          return {
              next: '/api/questions/?page=2'
          }
        },

        methods: {
            ...mapActions('auth', [
                'getUser'
            ]),
            ...mapActions('category',[
                'getCategories'
            ]),

            ...mapActions('question',[
                'getQuestions'
            ]),

            pushQuestions(data){
                this.questions.push(...data.data);
            }
        },


        mounted() {
            console.log('Component mounted.');

            if(this.accessToken){
                this.getUser()
            }
            this.getCategories();
            this.getQuestions();
        },
    }
</script>
