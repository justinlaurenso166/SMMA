import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import Dashboard from "../views/Dashboard.vue"
import JenisMesin from "../views/Jenis_Mesin/JenisMesin.vue"
import DetailJenisMesin from "../views/Jenis_Mesin/DetailJenisMesin.vue"
import EditJenisMesin from "../views/Jenis_Mesin/EditJenisMesin.vue"
import TambahJenisMesin from "../views/Jenis_Mesin/TambahJenisMesin.vue"
import Monitoring from "../views/Monitoring/Monitoring.vue"
import DetailMonitoring from "../views/Monitoring/DetailMonitoring.vue"
import UserSetting from "../views/UserSetting.vue"
import Login from "../views/Login.vue"
import PageNotFound from "../views/PageNotFound.vue"
import store from "../store"

const routes = [
    { path: '/', redirect: "/login", meta: { requireAccess: false } },
    { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requireAccess: false } },
    { path: "/login", name: "Login", component: Login, meta: { requireAccess: false } },
    { path: "/jenis_mesin", name: "JenisMesin", component: JenisMesin, meta: { requireAccess: false } },
    { path: "/jenis_mesin/:_id", name: "DetailJenisMesin", component: DetailJenisMesin, meta: { requireAccess: false } },
    { path: "/jenis_mesin/:_id/edit", name: "EditJenisMesin", component: EditJenisMesin, meta: { requireAccess: true } },
    { path: "/jenis_mesin/add", name: "TambahJenisMesin", component: TambahJenisMesin, meta: { requireAccess: true } },
    { path: "/monitoring", name: "Monitoring", component: Monitoring, meta: { requireAccess: false } },
    { path: "/monitoring/:_id", name: "DetailMonitoring", component: DetailMonitoring, meta: { requireAccess: false } },
    { path: "/user_setting", name: "UserSetting", component: UserSetting, meta: { requireAccess: false } },
    { path: '/:pathMatch(.*)*', component: PageNotFound, meta: { requireAccess: false } },
];

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes,
    scrollBehavior(to, from, last) {
        // always scroll to top when entering page
        return { top: 0 };
    },
});

router.beforeEach(function(to, from, next) {
    if (to.path !== "/login" && store.state.user_data === null) {
        next("/login")
    } else {
        if (to.meta.requireAccess === false) {
            next();
        } else {
            if (store.state.user_data.hak_akses === 1) {
                next();
            } else {
                router.go(-1)
            }
        }
    }
});

export default router;