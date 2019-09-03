<template>
    <div class="container">
      <div class="row justify-content-center">
          <div class="col-12 col-md-12 mb-3">
              <ListQuestionAnswersComponent class="card">
                  <div class="card-body">
                      <div v-if="editing">
                          <div class="form-group">
                              <textarea class="form-control" v-model="this.answer.body"></textarea>
                          </div>
                          <button class="btn btn-xs btn-primary">Update</button>
                          <button class="btn btn-xs btn-link" @click="editing = false">Cancel</button>
                      </div>
                      <div v-else>
                          <p class="card-text" style="font-family: Playfair Display, sans-serif">{{ this.answer.body }}</p>
                      </div>
                  </div>
                  <div class="card-footer">

                      <div class="d-flex align-items-center">
                          <div>
                              <img src="https://www.getreplacer.com/images/photo-04.jpg" class="rounded-circle mr-2 p-0 border-light" height="40" alt="">
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
                                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                              </div>
                          </div>
                      </div>

                  </div>
              </ListQuestionAnswersComponent>
          </div>
      </div>
   </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        props:['answer'],

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
                'removeAnswer'
            ]),

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
