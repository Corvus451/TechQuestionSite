<script setup>
import { useRouter } from 'vue-router';
import QuestionForm from '../components/questionForm/QuestionForm.vue';
import { postQuestion } from '../utility/api';

const router = useRouter();

const handlePost = async (title, details) => {
    if (title && details) {
        const success = await postQuestion(title, details);
        if (success) {
            router.push('/');
        }
    }
}

</script>

<template>

    <div class="form-container">
        <h1>Post question</h1>
        <QuestionForm :handle-post="handlePost" />
    </div>

</template>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    /* width: 15rem; */
    margin: 0 auto;

    h1 {
        align-self: center;
    }

    a {
        padding-top: 0.5rem;
    }
}
</style>