<template>
    <button type="submit" class="btn btn-link text-decoration-none text-dark" @click="toggle" v-html="this.classes[0] + count">
    </button>
</template>

<script>
    import ApiService from "../../services/api.service";

    export default {

        props: ['answer', 'user'],

        data() {
            return {
                count: this.answer.stars.length,
                active: this.answer.stared
            }
        },
        computed: {
            classes() {
                return [
                    this.active ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="feather"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>':'<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="feather"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
                ];
            },
        },
        methods: {
            toggle() {
                this.active ? this.destroy() : this.create();
            },
            create() {
                ApiService.post('/api/answers/answer/'+this.answer.id+'/'+this.user.id+'/attach');
                this.active = true;
                this.count++;
            },
            destroy() {
                ApiService.post('/api/answers/answer/'+this.answer.id+'/'+this.user.id+'/detach');
                this.active = false;
                this.count--;
            }
        }

    }
</script>
