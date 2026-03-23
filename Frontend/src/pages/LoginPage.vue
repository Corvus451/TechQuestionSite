<script setup>
import { RouterLink, useRouter } from 'vue-router';
import LoginForm from '../components/authform/LoginForm.vue';
import { login } from '../utility/api';

const router = useRouter();

const handleLogin = async (username, password) => {
    if (username && password) {
        const success = await login(username, password);
        if (success) {
            router.push('/');
        }
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