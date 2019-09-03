<template>
    <div class="col-lg-8 col-md-12 mb-3" >
        <div class="card">
            <div class="card-body">
                <p class="card-text lead" style="font-family: 'Playfair Display', serif;">{{ answer.body }}</p>
            </div>
            <div class="card-footer">
                <div class="d-flex col-9">
                    <img src="{{ answer.user.avatar }}" class="rounded-circle mr-2 p-0 border-light" height="40">
                    <div class="small"><p class="card-link text-dark m-1 p-0">{{ answer.user.name }}</p> <p class="text-secondary m-1 p-0">Last updated 3 mins ago</p></div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['answer'],


        mounted() {
           console.log('component mounted');
        }
    }
</script>
