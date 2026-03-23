import { ref } from "vue";

export const user = ref(null);

export const isLoggedIn = () => !!user.value;