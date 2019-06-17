<template>
    <div>
        <div v-if="isLoading" >Loading articles...</div>
        <div v-else >
            <div v-if="listPodcast.length === 0" >
                No feeds are here...
            </div>
            
        </div>
    </div>
</template>

<script>

    export default {
        name: "feedList",
        data(){
            return {
                listPodcast: []
            }
        },
        methods: {
            
        }
    }

</script>
