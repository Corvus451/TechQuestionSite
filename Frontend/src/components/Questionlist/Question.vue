<script setup>
import { ref } from 'vue';

defineProps({
    question: Object
});

</script>

<template>

    <div class="qcard">
        <div class="qctop">
            <div class="qchead">
                <span>username placeholder</span>
                <span>{{ question.upvotes }}</span>
            </div>
            <h3>{{ question.title }}</h3>
        </div>
        <hr>
        <div class="qcard-main">
            <span>{{ question.details }}</span>
        </div>
    </div>

</template>

<style scoped>
.qcard {
    background-color: #252525;
    border-radius: 8px;
    margin-left: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 18px 5px black;

    h3 {
        margin: 0%;
        padding: 0%;
    }

    hr {
        width: 98%;
        align-self: center;
    }
}

.qctop {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px 8px 0px 0px;
    padding: 0.5rem;
    align-items: flex-start;
    gap: 0.5rem;
}

.qchead {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    justify-items: space-between;
}

.qcard-main {
    padding: 0.5rem;
}
</style>