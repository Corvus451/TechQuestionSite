<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['onRegister'])

const username = ref('');
const password = ref('');
const confirm = ref('');
const errormsg = ref('');
const timeout = ref(null);
const ready = ref(false)

const validate = () => {
    console.log('validating')
    if(!username.value || !password.value || !confirm.value){
        errormsg.value = 'All fields must be filled';
        ready.value = false;
        return;
    }
    if (password.value != confirm.value) {
        errormsg.value = 'passwords mismatch'
        ready.value = false;
        return;
    }
    errormsg.value = '';
    ready.value = true;

}

const onInput = () => {
    clearTimeout(timeout.value)

    timeout.value = setTimeout(() => {
        validate()
    }, 1000);
}

const handleRegister = () => {
    if (ready) {
        props.onRegister(username.value, password.value)
    }
}

</script>

<template>
    <div class="container">
        <form @submit.prevent="handleRegister">
            <span class="error" v-if="errormsg != ''">{{ errormsg }}</span>

            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required v-model="username" @input="onInput">
            </div>
    
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required v-model="password" @input="onInput">
            </div>
    
            <div class="input-group">
                <label for="confirm">Confirm password</label>
                <input type="password" name="confirm" id="confirm" required v-model="confirm" @input="onInput">
            </div>
            <button class="button-s" type="submit" :disabled="ready">Register</button>
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