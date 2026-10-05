import { createRouter, createWebHistory } from "vue-router";
import Search from "@/pages/Search.vue";
import Rates from "@/pages/Rates.vue";
import Profile from "@/pages/Profile.vue";
import Login from "@/pages/Login.vue";
import Hotel from "@/pages/Hotel.vue";

const isAuthorized = () =>
    localStorage.hasOwnProperty("token") ||
    sessionStorage.getItem("demoAccount") === "true";

const authGuard = function (to, from, next) {
    !isAuthorized() ? next({ path: "/Login" }) : next();
};
const authorized = function (to, from, next) {
    isAuthorized() ? next({ path: "/" }) : next();
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Search,
        },
        {
            path: "/Rates/:id",
            component: Rates,
            beforeEnter: authGuard,
        },
        {
            path: "/Login",
            component: Login,
            beforeEnter: authorized,
        },
        {
            path: "/Profile",
            component: Profile,
            beforeEnter: authGuard,
        },
        {
            path: "/Hotel/:id",
            component: Hotel,
        },
    ],
});

export default router;
