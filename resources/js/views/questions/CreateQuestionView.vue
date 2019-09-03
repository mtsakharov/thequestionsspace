<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card rounded-4 mb-3">
                    <div data-filter="overlay-theme" class="card-body text-center text-white py-5" style="background-color: rgba(0, 0, 0, 0); background-position: 0% 0%, 0% 0%, center 40%; background-repeat: repeat, repeat, repeat; background-attachment: scroll, scroll, scroll; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(&quot;https://lorempixel.com/1200/300/?98395&quot;), none; background-size: cover; background-origin: padding-box, padding-box, padding-box; background-clip: border-box, border-box, border-box;">
                        <h3 class="card-title text-center my-5" style="font-family: Playfair Display, sans-serif;">
                            Hello world
                        </h3>
                    </div>
                    <div class="card-footer bg-white">
                        <div class="row">
                            <div class="d-flex col-9">
                                <img src="https://www.getreplacer.com/images/photo-04.jpg" class="rounded-circle mr-2 p-0 border-light" height="40">
                                <div class="small">
                                    <p class="card-link text-dark m-1 p-0">Ms. Ernestine Kovacek</p>
                                    <p class="text-secondary m-1 p-0">Last updated 3 mins ago</p>
                                </div>
                            </div>
                            <div class="col-3 text-align-right"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h4 class="mb-3">Ask Question</h4>
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

