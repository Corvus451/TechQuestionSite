<script setup>

    import Question from './Question.vue';

    defineProps({
        questions: Array
    });

</script>

<template>

    <Question v-for="question in questions" :key="question" :question="question" />

</template>

<style>
    
</style>