<template>
    <button v-if="next" @click="paginate(next)" type="button" class="btn btn-primary btn-block">Load More</button>
</template>

<script>
    import ApiService from "../../services/api.service";

    export default {
        props:['url'],

        data() {
            return {
                next: this.url
            }
        },

        methods: {
            paginate(url = '') {
                ApiService.get(url)
                    .then(response => {
                        this.$emit('completed', response.data);
                        this.next = response.data.links.next;
                    })
                    .catch(e => console.error(e));
            }
        },
        mounted() {
            console.log('Component mounted.');
        }
    }
</script>

