<template>
    <button type="submit" class="btn btn-link text-decoration-none text-dark" @click="toggle" v-html="this.classes[0] + count">
    </button>

</template>

<script>
    import ApiService from "../../services/api.service";

    export default {

        props: ['question', 'user'],

        data() {
            return {
                count: this.question.bookmarks.length,
                active: this.question.marked
            }
        },
        computed: {
            classes() {
                return [
                    this.active ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="feather"><path d="M19 24l-7-6-7 6v-24h14v24z"/></svg>':'<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather text-dark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
                ];
            },
        },
        methods: {
            toggle() {
                this.active ? this.destroy() : this.create();
            },
            create() {
                ApiService.post('/api/questions/question/'+this.question.id+'/'+this.user.id+'/bookmark/attach');
                this.active = true;
                this.count++;
            },
            destroy() {
                ApiService.post('/api/questions/question/'+this.question.id+'/'+this.user.id+'/bookmark/detach');
                this.active = false;
                this.count--;
            }
        }

    }
</script>
