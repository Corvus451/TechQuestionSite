<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { authenticate } from './utility/api';
import Navbar from './components/Navbar/Navbar.vue';

onMounted(() => {
    authenticate()
});

</script>

<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
  
</template>

<style>
body {
  padding: 0%;
  margin: 0%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Ubuntu Sans Mono';
}

:visited {
  color: white;
}

.container {
    display: flex;
    flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
}

.register-container {
    display: flex;
    flex-direction: column;
    width: 15rem;
    margin: 0 auto;

    h1 {
        align-self: center;
    }

    a {
        padding-top: 0.5rem;
    }
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
</style>
