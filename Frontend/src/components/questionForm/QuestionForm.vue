<script setup>

    import { defineProps, ref } from 'vue';

    const props = defineProps(['handlePost']);

    const title = ref('');
    const details = ref('');

    const onSubmit = () => {
        if(title.value && details.value) {
            props.handlePost(title.value, details.value);
        }
    }

</script>

<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="input-group">
                <label for="title">Title</label>
                <textarea name="title" id="title" cols="50" rows="3" required v-model="title"></textarea>
            </div>

            <div class="input-group">
                <label for="details">Details</label>
                <textarea name="details" id="details" cols="50" rows="10" required v-model="details"></textarea>
            </div>

            <button class="button-s" type="submit">Submit</button>

        </form>
    </div>
</template>

<style scoped>

</style>