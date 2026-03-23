<script setup>
import { RouterLink } from 'vue-router';
import LoginForm from '../components/authform/LoginForm.vue';
import { login } from '../utility/api';

const handleLogin = (username, password) => {
 if (username && password) {
    console.log("logging in")
    login(username, password);
 }
}

</script>

<template>
    <div class="register-container">
        <h1>Login</h1>
        <LoginForm :onLogin="handleLogin"></LoginForm>
        <RouterLink to="/register">Register</RouterLink>
    </div>
</template>

<style scoped>

h1 {
    align-self: center;
}
</style>