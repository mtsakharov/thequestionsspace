<template>
   <div class="container my-3">
    <div class="row justify-content-center">
        <sidebar></sidebar>
        <div class="col-lg-8">
            <ProfileSettingsComponent :user="this.user"></ProfileSettingsComponent>
        </div>
    </div>
    </div>
</template>

<script>
    import {mapState, mapActions } from "vuex";
    import sidebar from "../../components/profile/SidebarMenuComponent";
    import ProfileSettingsComponent from  "../../components/profile/ProfileSettingsComponent";

    export default {
        components: {sidebar, ProfileSettingsComponent},

        computed: {
            ...mapState('auth', [
                'user'
            ]),
        },
        methods:{
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
