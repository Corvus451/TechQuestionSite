<script setup>
import { onMounted, ref } from 'vue';
import Questionlist from '../components/Questionlist/Questionlist.vue';

const questions = ref(null)
const loading = ref(true)

onMounted(async () => {
    try {
        const resp = await fetch('/api/questionlist')
        const result = await resp.json()
        questions.value = result
        console.log(result)
        loading.value = false
    } catch (error) {

    }

});
</script>

<template>

    <h2 v-if="loading">loading</h2>

    <template v-else>
        <h2>Recent questions</h2>

        <div class="questionlist">
            <Questionlist :questions="questions" />
        </div>

    </template>

</template>

<style scoped>
.questionlist {
    max-width: 40%;
}
</style>