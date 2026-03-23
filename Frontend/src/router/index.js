import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import CreateQuestion from "../pages/CreateQuestion.vue";
import { isLoggedIn } from "../utility/status";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage,
            meta: {noAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: {noAuth: true}
        },
        {
            path: '/postquestion',
            name: 'postquestion',
            component: CreateQuestion,
            meta: {authRequired: true}
        }
    ]
});

router.beforeEach((to, from) => {
    if (to.meta.authRequired && !isLoggedIn()) {
        return '/login';
    }

    console.log("logged in:", isLoggedIn());
    if (to.meta.noAuth && isLoggedIn()) {
        return '/';
    };
});

export default router