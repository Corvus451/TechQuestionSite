<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['onLogin'])

const username = ref('');
const password = ref('');

const handleLogin = () => {
    props.onLogin(username.value, password.value)
}

</script>

<template>
    <div class="container">
        <form @submit.prevent="handleLogin">
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required v-model="username" @input="onInput">
            </div>
    
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required v-model="password" @input="onInput">
            </div>
    
            <button class="button-s" type="submit">login</button>
        </form>
    </div>
</template>

<!-- <style scoped>

.container {
    display: flex;
    flex-direction: column;
}

form {
    border: 1px solid rgb(125, 125, 125);
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 1rem;
    align-items: flex-start;
    border-radius: 8px;
    gap: 1rem;

    label {
        padding-bottom: 0.4rem;
    }

    button {
        align-self: flex-end;
        color: white;
        background-color: #181818;
        border: 1px solid transparent;
        border-radius: 3px;
        padding: 0.3rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    button:hover {
        border: 1px solid #a2a2a2;
    }

    input {
        background-color: #181818;
        /* border: 1px solid #a2a2a2; */
        border: 1px solid transparent;
        border-radius: 3px;
        font-size: 1rem;
        color: white;
        padding: 0.2rem;
    }

    input:focus {
        /* border: 1px hidden; */
        border: 1px solid #a2a2a2;
        outline: none;
        border-radius: 3px
    }
}

.input-group {
    display: flex;
    flex-direction: column;
}

.error {
    color: darkred;
}
</style> -->