<script setup>
    import { useRouter } from "vue-router";
import store from "../store"
    const router = useRouter();

    const menu = [
        {
            name: "Dashboard",
            icon_white: "/src/assets/img/dashboard_white.png",
            icon_yellow: "/src/assets/img/dashboard_yellow.png",
            link: "/dashboard"
        },
        {
            name: "Jenis Mesin",
            icon_white: "/src/assets/img/jenis_white.png",
            icon_yellow: "/src/assets/img/jenis_yellow.png",
            link: "/jenis_mesin"
        },
        {
            name: "Monitoring",
            icon_white: "/src/assets/img/monitoring_white.png",
            icon_yellow: "/src/assets/img/monitoring_yellow.png",
            link: "/monitoring"
        },
        {
            name: "User Setting",
            icon_white: "/src/assets/img/setting_white.png",
            icon_yellow: "/src/assets/img/setting_yellow.png",
            link: "/user_setting"
        }
    ]

    function logout(){
        store.dispatch("resetAllStore")
        router.push({name:"Login"})
    }
</script>

<style scoped>

</style>

<template>
    <div class="w-96">
        <section class="h-screen bg-main_blue py-8 sidebar w-full max-h-screen overflow-y-auto relative">
            <section>
                <div class="user-photo">
                    <div class="bg-light w-44 h-44 rounded-full m-auto flex items-center justify-center">
                        
                    </div>
                </div>
                <div class="username">
                    <h1 class="text-center text-light capitalize text-3xl mt-7 font-bold">{{$store.state.user_data.username}}</h1>
                </div>
            </section>
            <hr class="mb-6 mt-8 text-main_yellow">
            <section class="mx-7">
                <div v-for="i in 3" :key="i">
                    <router-link :to="menu[i-1].link" class="flex items-center">
                        <img :src="$route.path.includes(menu[i-1].link) ? menu[i-1].icon_yellow : menu[i-1].icon_white" class="inline w-9 h-9 mr-5">
                        <div class="py-3.5 font-normal text-xl hover:text-main_yellow cursor-pointer" :class="$route.path.includes(menu[i-1].link) ? 'text-main_yellow' : 'text-light'">
                                {{menu[i-1].name}}
                        </div>
                    </router-link>
                </div>
            </section>
            <hr class="my-6 text-main_yellow">
            <section class="mx-7">
                <router-link :to="menu[menu.length - 1].link" class="flex items-center">
                    <img :src="$route.path.includes(menu[menu.length - 1].link) ? menu[menu.length - 1].icon_yellow : menu[menu.length - 1].icon_white" class="inline w-9 h-9 mr-5">
                    <div class="text-light py-3 font-normal text-xl hover:text-main_yellow cursor-pointer" :class="$route.path.includes(menu[menu.length -1].link) ? 'text-main_yellow' : 'text-light'">
                            {{menu[menu.length-1].name}}
                    </div>
                </router-link>
            </section>
            <div class="absolute bottom-0 py-8 px-5 w-full">
                <button class="bg-main_red text-light w-full text-xl p-2 rounded-lg" @click="logout()">Logout</button>
            </div>
        </section>
    </div>
</template>