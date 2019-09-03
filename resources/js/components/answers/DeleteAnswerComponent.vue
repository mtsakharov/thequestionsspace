<template>
    <button class="btn btn-xs btn-danger mr-1" @click="this.removeAnswer(this.question).then(response => {this.$emit('deleted')})">Delete</button>
</template>

<script>

    import {mapActions} from 'vuex';
    export default {
        props: ['question'],

        methods:{
            ...mapActions('answer', [
                'removeAnswer'
            ]),
        }


    }
</script>
