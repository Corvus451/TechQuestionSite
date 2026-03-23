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
        <div class="qcard-main">
            <span>{{ question.details }}</span>
        </div>
    </div>

</template>

<style scoped>
.qcard {
    border-radius: 8px;
    /* background-color: gray; */
    margin-left: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    /* padding: 0.5rem; */
    /* max-width: 40%; */
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
    background-color: #252525;
    border-radius: 8px 8px 0px 0px;
    padding: 0.5rem;
    align-items: center;
}

.qcard-main {
    padding: 0.5rem;
}
</style>