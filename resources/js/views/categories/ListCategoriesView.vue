<template>
    <div class="container py-4">
        <div class="row">
            <div class="row">
                <div class="col-12 mb-4">
                    <h4 class="font-weight-bold">Categories<span class="badge badge-light badge-pill ml-2">{{ this.categories.length }}</span></h4>
                </div>
                <CategoryCardComponent v-for="(category, index) in this.categories" :key="index" :category="category"></CategoryCardComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex';
    import CategoryCardComponent from "../../components/categories/CategoryCardComponent";

    export default {
        components: {CategoryCardComponent},

        computed:{
            ...mapState('category',[
                'categories'
            ]),
        },

        methods:{
            ...mapActions('category',[
                'getCategories'
            ]),
        },

        mounted() {
            this.getCategories();
        },
    }
</script>
