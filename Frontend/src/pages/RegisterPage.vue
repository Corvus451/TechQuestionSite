<script setup>
import { RouterLink, useRouter } from 'vue-router';
import RegisterForm from '../components/authform/RegisterForm.vue';
import { register } from '../utility/api';

const router = useRouter();

const handleRegister = async (username, password) => {
    if(username && password) {
        const success = await register(username, password)
        if(success) {
            router.push('/');
        }
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