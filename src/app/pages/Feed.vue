<template>
    <div class="feed-container" >
        <FeedList />
    </div>
</template>

<script>
import FeedList from '../components/FeedList'

export default {
    name: 'FeedPage',
    components: {
        FeedList
    }
}
</script>

<style scoped>

.feed-container{
    padding-top: 100px;
    padding-left: 50px;
}

</style>

