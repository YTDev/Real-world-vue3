<template>

    <p>Register for the event here.</p>
    <button @click="register">Register Me</button>
</template>

<script>
    
    export default {
        props: ['event'],
        methods: {
            register() {
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