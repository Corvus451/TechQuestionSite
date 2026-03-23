<script setup>
import { ref } from 'vue';

defineProps({
    question: Object
});

</script>

<template>

    <div class="qcard border-thin">
        <div class="qcard-top">
            <h3>{{ question.title }}</h3>
            <span>{{ question.upvotes }}</span>
        </div>
        <hr>
        <span>{{ question.details }}</span>
    </div>

</template>

<style scoped>

.qcard {
    border-radius: 8px;
    /* background-color: gray; */
    margin-left: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    max-width: 40%;
    display: flex;
    flex-direction: column;

    h3 {
        margin: 0%;
        padding: 0%;
    }
}

.qcard-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
    
</style>