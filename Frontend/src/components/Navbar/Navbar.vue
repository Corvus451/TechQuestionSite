<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { logout } from '../../utility/api';
import { isLoggedIn, user } from '../../utility/status';

</script>

<template>
<nav>
    <RouterLink to="/">Home</RouterLink>
    <template v-if="isLoggedIn()">
        <span>{{ user.username }}</span>
        <button @click="logout">logout</button>
    </template>
    <template v-else>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
    </template>
</nav>
</template>

<style>

nav {
    display: flex;
    gap: 2rem;
    background-color: grey;
    margin: 0%;
}
    
</style>