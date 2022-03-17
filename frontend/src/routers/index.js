import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"

const store = useStore();

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, last) {
        // always scroll to top when entering page
        return { top: 0 };
    },
});

// navigation guards
// router.afterEach(function(to, from, failure) {
//     if (failure) console.log("failure");
//     else store.commit("MUTATE_USER_DATA", to.path);
// });

// router.beforeEach(function(to, from, next) {
//     if (to.path !== "/login" && store.state.user_data.username === "") {
//         next("/login")
//     } else {
//         next();
//     }
// });

export default router;