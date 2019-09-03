<template>


    <!-- Modal -->
    <div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle"></h5>
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
                            <strong  v-if="ErrorMessage.image" class="">{{ ErrorMessage.form.image[0] }}</strong>
                        </div>

                        <div class="form-group">
                            <label for="body" class="col-form-label">Question:</label>
                            <input type="text" id="body" class="form-control" name="body" v-model="form.body">
                            <strong  v-if="ErrorMessage.body" class="">{{ ErrorMessage.body[0] }}</strong>
                        </div>

                        <div class="form-group">
                            <label for="category_id" class="col-form-label">Category:</label>
                            <select class="custom-select" id="category_id" name="category_id" v-model="form.category_id">
                                <option>Select</option>
                                <option v-for="category in categories" v-bind:value="category.id">{{ category.name}}</option>
                            </select>
                            <strong  v-if="ErrorMessage.category_id" class="">{{ ErrorMessage.category_id[0] }}</strong>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" @click="handleSubmit">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations} from 'vuex';

    export default {

        computed:{
            ...mapState('auth', [
                'user',
                'ErrorMessage',
            ]),

            ...mapState('question', [
                'ErrorMessage',
            ]),

            ...mapState('category',[
                'categories'
            ]),
        },

        data(){
            return {
               form: {
                   body:null,
                   image:null,
                   category_id:null,
               }

            }
        },

        methods:{
            ...mapMutations('question', [
                'clearError'
            ]),

            ...mapActions('category', [
                'getCategories',
            ]),

            ...mapActions('question', [
                'storeQuestion',
            ]),

            onFileChanged (event) {
                this.selectedFile = event.target.files[0]

                const formData = new FormData();

                formData.append('file', this.selectedFile, this.selectedFile.name);

                axios.post('/api/questions/question/image/upload', formData, {
                    onUploadProgress: progressEvent => {
                        console.log(progressEvent.loaded / progressEvent.total)
                    }
                }).then(response =>
                    this.form.image = response.data
                );
            },

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.storeQuestion({body: this.form.body, category_id: this.form.category_id, image: this.form.image, user_id: this.user.id});

                this.form = '';
            },


        },

        mounted() {
            console.log('Component mounted.');
            this.clearError();
            this.getCategories();
        }
    }
</script>

