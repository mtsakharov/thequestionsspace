<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <answer-form class="card mb-3">
                    <div class="card-header">Reply</div>
                    <div class="card-body">
                        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete errorMessage[$event.target.name]">
                            <div class="form-group">
                                <label for="body"></label>
                                <textarea name="body" class="form-control"  id="body" v-model="body"></textarea>
                                <strong  v-if="errorMessage.body" class="">{{ errorMessage.body[0] }}</strong>
                            </div>
                            <button class="btn btn-xs btn-primary" type="submit">Reply</button>
                        </form>
                    </div>
                </answer-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex';

    export default {

        props: ['user', 'question'],

        data(){
            return {
                body: '',
            }
        },

        computed:{
            ...mapState('answer', [
                'errorMessage',
            ]),
        },

        methods:{
            ...mapActions('answer', [
                'storeAnswer',
            ]),

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.storeAnswer({body: this.body, question_id: this.question.id, user_id: this.user.id,})
                    .then(response => {this.$emit('completed', response)});

                this.body = ''

            },
        },

        mounted() {
            console.log('component.mounted')
        }
    }
</script>
