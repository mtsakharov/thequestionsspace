<template>
    <div class="col-lg-4 col-md-6 mb-4">
        <router-link :to="'/categories/category/'+this.category.id">
        <div class="card">
            <div class="card-body text-center text-white py-5" data-filter="overlay-theme" :style="{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('${this.category.image}'), center 40%`, backgroundSize: 'cover'}">
                <h3 class="card-title text-center my-5" style="font-family: Playfair Display,serif;">
                    {{ this.category.name }}
                </h3>
            </div>

            <div class="card-footer bg-white delimiter-top">
                <div class="d-flex align-items-between">
                    <div>
                        <div class="actions text-dark">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            {{ this.category.questions.length }}
                            Questions

                        </div>
                    </div>
                    <div class="ml-auto">
                        <div class="actions text-dark">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather text-dark"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            {{ this.category.views }}

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        props:['category'],

        mounted() {
            console.log('component mounted');
        }
    }
</script>
