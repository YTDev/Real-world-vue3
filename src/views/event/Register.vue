<template>

    <p>Register for the event here.</p>
    <button @click="register">Register Me</button>
</template>

<script>
    
    export default {
        props: ['event'],
        inject: ['GStore'],
        methods: {
            register() {

                this.GStore.flashMessage = 'You are successfully registred for this '+ this.event.title;
                setTimeout(() => {
                    this.GStore.flashMessage = ''
                }, 3000);
                //Call to api
                //If registered then redirect to event details

                this.$router.push({
                    name: "EventDetails",
                    // since we are on the registerd component we don't need the id
                    // params: { id: this.event.id }
                })

                // this.$router.replace({
                //     name: 'EventDetails',
                //     // params: { id: 3}
                // });

                
            }
        }
    }
    
</script>