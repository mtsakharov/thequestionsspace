

<template>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Open modal for @mdo</button>


        <div class="modal" id="exampleModal" tabindex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete ErrorMessage[$event.target.name]">

                            <div class="form-group">
                                <label for="file" class="col-form-label">Background image:</label>
                                <input type="file" class="form-control" ref="file" id="file" name="file" @change="onFileChanged">
                                <div class="" v-if="form.image">
                                    <img class="w-100" :src="form.image">
                                </div>
                                <div class="" v-else>
                                    <img class="w-100" :src="question.data.image">
                                </div>
                                <strong  v-if="ErrorMessage.image" class="">{{ ErrorMessage.form.image[0] }}</strong>
                            </div>

                            <div class="form-group">
                                <label for="body" class="col-form-label">Question:</label>
                                <input type="text" id="body" class="form-control" name="body"  v-model="question.data.body">
                                <strong  v-if="ErrorMessage.body" class="">{{ ErrorMessage.body[0] }}</strong>
                            </div>

                            <div class="form-group">
                                <label for="category_id" class="col-form-label">Category:</label>
                                <select class="custom-select" id="category_id" name="category_id" v-model="question.data.category.name">
                                    <option>Select</option>
                                    <option v-for="category in categories">{{ category.name}}</option>
                                </select>
                                <strong  v-if="ErrorMessage.category_id" class="">{{ ErrorMessage.category_id[0] }}</strong>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="handleSubmit">Send message</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations} from 'vuex';

    export default {
        props: ['id'],

        computed:{
            ...mapState('auth', [
                'user',
                'ErrorMessage',
            ]),

            ...mapState('question', [
                'ErrorMessage',
                'question'
            ]),

            ...mapState('category',[
                'categories'
            ]),

            ...mapMutations('question', [
                'clearError'
            ]),
        },

        data(){
            return {
                form: {
                    image:null,
                }
            }
        },

        methods:{
            ...mapActions('category', [
                'getCategories',
            ]),

            ...mapActions('question', [
                'getQuestion',
                'updateQuestion',
            ]),


            onFileChanged (event) {
                this.selectedFile = event.target.files[0];

                const formData = new FormData();

                formData.append('file', this.selectedFile, this.selectedFile.name);

                // Upload image
                axios.post('/api/questions/question/image/upload', formData, {
                    onUploadProgress: progressEvent => {
                        console.log(progressEvent.loaded / progressEvent.total)
                    }
                }).then(response =>
                    this.question.data.image = response.data
                );
            },

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.updateQuestion({id:this.question.data.id, body: this.question.data.body, category_id: this.question.data.category_id, image: this.question.data.image, user_id: this.user.id});
            },
        },

        mounted() {
            console.log('Component mounted.');
            this.clearError();
            this.getQuestion(this.id)
        }
    }
</script>

