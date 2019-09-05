<template>
    <div class="mb-3" >
        <div class="card">
            <div class="card-body">
                <div v-if="editing">
                    <div class="form-group">
                        <textarea class="form-control" v-model="this.answer.body"></textarea>
                    </div>
                    <button class="btn btn-xs btn-primary" @click="updateAnswer()">Update</button>
                    <button class="btn btn-xs btn-link" @click="editing = false">Cancel</button>
                </div>
                <div v-else>
                    <p class="card-text" style="font-family: Playfair Display, sans-serif">{{ this.answer.body }}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex align-items-center">
                    <div>
                        <img :src="this.answer.user.avatar" class="rounded-circle mr-2 p-0 border-light" height="40" alt="">
                    </div>
                    <div class="small">
                        <p class="card-link text-dark m-1 p-0">{{ this.answer.user.name }}</p>
                        <p class="text-secondary m-1 p-0">Last updated 3 mins ago</p>
                    </div>

                    <div class="ml-auto">
                        <div class="actions" v-if="answer.user.id === this.user.id">
                            <button class="btn btn-xs btn-primary mr-1" @click="editing = true">Edit</button>
                            <button class="btn btn-xs btn-danger mr-1" @click="removeAnswerNow(answer.id)">Delete</button>
                        </div>
                        <div v-else class="actions">
                            <star-component :answer="answer" :user="this.user"></star-component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import StarComponent from "./StarComponent";

    export default {
        props:['answer'],

        components:{StarComponent},

        data() {
            return {
                editing: false,
            };
        },

        computed:{
            ...mapState('auth', [
                'user'
            ])
        },

        methods:{
            ...mapActions('answer', [
                'updateAnswer',
                'removeAnswer'
            ]),

            handleSubmit() {
                this.updateAnswer({body: 1, question_id: 1, user_id: 1})
                    .then(response => {this.$emit('updated', response)});
            },

            removeAnswerNow(answer){
                this.removeAnswer(answer);
                this.$emit('deleted', answer);
            }
        },

        mounted() {
            console.log('component mounted');
        }
    }
</script>
