import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import Dashboard from "../views/Dashboard.vue"
import JenisMesin from "../views/JenisMesin.vue"
import Login from "../views/Login.vue"

const store = useStore();

const routes = [
    { path: '/', redirect: "/login" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/login", name: "Login", component: Login },
    { path: "/jenis_mesin", name: "JenisMesin", component: JenisMesin },
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
//     if (to.path !== "/login" && store.state.user_data === {}) {
//         next("/login")
//     } else {
//         next();
//     }
// });

export default router;