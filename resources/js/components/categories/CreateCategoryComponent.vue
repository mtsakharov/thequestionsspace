<template>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#CategoryModal">Add Category</button>


        <div class="modal" id="CategoryModal" tabindex="-2" role="dialog" aria-labelledby="CategoryModalLabel" aria-hidden="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="CategoryModalLabel">New Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete this.errorMessage[$event.target.name]">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="file" class="col-form-label">Background image:</label>
                                    <input type="file" class="form-control" ref="file" id="file" name="file" @change="onFileChanged">
                                    <div class="" v-if="form.image">
                                        <img class="w-100" :src="form.image" alt="">
                                    </div>
                                    <strong  v-if="this.errorMessage.image" class="">{{ this.errorMessage.image[0] }}</strong>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" name="name" id="name" v-model="form.name">
                                <strong  v-if="this.errorMessage.name" class="">{{ this.errorMessage.name[0] }}</strong>

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
    </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex';

    export default {
        mounted() {
            console.log('Component mounted.')
        },

        computed:{
            ...mapState('category', [
                'errorMessage',
            ]),
        },

        data(){
            return {
                form: {
                    image: '',
                    name: ''
                }
            }
        },

        methods: {
            ...mapActions('category', [
                'storeCategory'
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
                    this.form.image = response.data
                );
            },

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.storeCategory({image: this.form.image, name: this.form.name});

                this.form.image = "";
                this.form.name = "";
            },
        }
    }
</script>
