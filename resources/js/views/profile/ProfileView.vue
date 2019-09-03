<template>
        <div class="container my-3">
            <div class="row justify-content-center">
                <sidebar></sidebar>
                <div class="col-lg-8">
                    <profile-card></profile-card>

                    <CardQuestionComponent class="col-lg-12" v-for="(question, index) in this.user.questions" :key="index" :question="question"></CardQuestionComponent>

                </div>
            </div>
        </div>
</template>

<script>
    import {mapState, mapActions } from "vuex";
    import sidebar from "../../components/profile/SidebarMenuComponent";
    import profileCard from "../../components/profile/ProfileCardComponent";
    import CardQuestionComponent from "../../components/questions/CardQuestionComponent";


    export default {
        components: {sidebar, profileCard, CardQuestionComponent},

        computed:{
            ...mapState('auth', [
                'user'
            ]),
        },
        methods: {
            ...mapActions('auth', [
                'getUser'
            ]),
        },

        mounted() {
            console.log('Component mounted.');

            this.getUser();
        }
    }
</script>
