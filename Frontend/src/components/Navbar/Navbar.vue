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
            <RouterLink to="/postquestion">Post question</RouterLink>
            <div class="user-display">
                <span>{{ user.username }}</span>
                <button class="button-s" @click="logout">logout</button>
            </div>
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
    background-color: #252525;
    margin: 0.5rem;
    margin-bottom: 0;
    padding: 0.7rem;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 0px 18px 5px black;
    z-index: 1;

    a {
        padding: 0.4rem;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    a.router-link-active {
        border: 1px solid #a2a2a2;
        border-radius: 3px;
    }

    a:hover {
        box-shadow: 0px 0px 5px white;
    }
}

.user-display {
    margin-left: auto;
    gap: 1rem;
    display: flex;
    align-items: center;
}
</style>