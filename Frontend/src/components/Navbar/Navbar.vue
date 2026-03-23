<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { logout } from '../../utility/api';
import { isLoggedIn, user } from '../../utility/status';

</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>

        <div class="user-display" v-if="isLoggedIn()">
            <span>{{ user.username }}</span>
            <button class="button-s" @click="logout">logout</button>
        </div>

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
    background-color: #252525;
    margin: 0%;
    padding: 0.5rem;
    align-items: center;
}

.user-display {
    margin-left: auto;
    gap: 1rem;
    display: flex;
    align-items: center;
}
</style>