import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import Dashboard from "../views/Dashboard.vue"
import JenisMesin from "../views/Jenis_Mesin/JenisMesin.vue"
import DetailJenisMesin from "../views/Jenis_Mesin/DetailJenisMesin.vue"
import EditJenisMesin from "../views/Jenis_Mesin/EditJenisMesin.vue"
import TambahJenisMesin from "../views/Jenis_Mesin/TambahJenisMesin.vue"
import Monitoring from "../views/Monitoring/Monitoring.vue"
import DetailMonitoring from "../views/Monitoring/DetailMonitoring.vue"
import Login from "../views/Login.vue"
import store from "../store"

const routes = [
    { path: '/', redirect: "/login" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/login", name: "Login", component: Login },
    { path: "/jenis_mesin", name: "JenisMesin", component: JenisMesin },
    { path: "/jenis_mesin/:_id", name: "DetailJenisMesin", component: DetailJenisMesin },
    { path: "/jenis_mesin/:_id/edit", name: "EditJenisMesin", component: EditJenisMesin },
    { path: "/jenis_mesin/add", name: "TambahJenisMesin", component: TambahJenisMesin },
    { path: "/monitoring", name: "Monitoring", component: Monitoring },
    { path: "/monitoring/:_id", name: "DetailMonitoring", component: DetailMonitoring },
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

router.beforeEach(function(to, from, next) {
    if (to.path !== "/login" && store.state.user_data === null) {
        next("/login")
    } else {
        next();
    }
});

export default router;