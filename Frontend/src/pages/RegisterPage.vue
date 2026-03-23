<script setup>
import { RouterLink } from 'vue-router';
import RegisterForm from '../components/authform/RegisterForm.vue';
import { register } from '../utility/api';

const handleRegister = (username, password) => {
    if(username && password) {
        register(username, password)
    }
}

</script>

<template>
    <div class="register-container">
        <h1>Register</h1>
        <RegisterForm :onRegister="handleRegister"/>
        <RouterLink to="/login">Login</RouterLink>
    </div>
</template>

<style scoped>

</style>