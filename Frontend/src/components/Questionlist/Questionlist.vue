<script setup>

    import Question from './Question.vue';

    defineProps({
        questions: Array
    });

</script>

<template>

    <div>
        <Question v-for="question in questions" :key="question" :question="question" />
    </div>


</template>

<style>
    
</style>