<template>
    <div class="col-12 order-md-1">
        <h4 class="mb-3">Settings</h4>
        <form method="POST" @submit.prevent="handleSubmit" @keydown="delete ErrorMessage[$event.target.name]">
            <div class="row">
                 <div class="col-md-12 mb-3">
                    <label for="file" class="col-form-label">Avatar image:</label>
                    <input type="file" class="form-control" ref="file" id="file" name="file" @change="onFileChanged">
                    <div class="" v-if="this.user.avatar">
                        <img class="w-100" :src="user.avatar" alt="">
                    </div>
                    <strong  v-if="this.ErrorMessage.image" class="">{{ this.ErrorMessage.image[0] }}</strong>
                 </div>

                <div class="col-md-12 mb-3">
                    <label for="firstName">First name</label>
                    <input type="text" class="form-control" id="firstName" name="name" placeholder="First name"  v-model="user.name">
                    <div class="invalid-feedback">
                        Valid first name is required.
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="email">Email <span class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" name="email" v-model="user.email" placeholder="you@example.com">
                <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                </div>
            </div>

            <hr class="mb-4">

            <button class="btn btn-primary btn-lg btn-block" type="submit" @click="handleSubmit">Update Settings</button>
        </form>
    </div>
</template>

<script>
    import { mapState, mapActions} from 'vuex';

    export default {
        props: ['user'],

        computed:{
            ...mapState('auth', [
                'user',
                'ErrorMessage',
            ])
        },

        data(){
            return {
                form: {
                    image:null,
                }
            }
        },

        methods:{
            ...mapActions('auth', [
                'updateUser'
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
                  this.user.avatar = response.data
                );
            },

            handleSubmit() {
                // Perform a simple validation that email and password have been typed in
                this.updateUser({id:this.user.id, email:this.user.email, name:this.user.name, avatar:this.user.avatar})
            },
        }


    }
</script>
