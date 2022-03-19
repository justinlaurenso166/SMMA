<script setup>
    import { useRouter } from "vue-router";
import store from "../store"
    const router = useRouter();

    const menu = [
        {
            name: "Dashboard",
            icon: "/",
            link: "/dashboard"
        },
         {
            name: "Jenis Mesin",
            icon: "/",
            link: "/jenis_mesin"
        },
         {
            name: "Monitoring",
            icon: "/",
            link: "/monitoring"
        },
         {
            name: "User Setting",
            icon: "/",
            link: "/user_setting"
        }
    ]

    function logout(){
        store.commit("MUTATE_USER_DATA", null);
        router.push({name:"Login"})
    }
</script>

<style scoped>

</style>

<template>
    <div class="w-96">
        <section class="h-screen bg-main_blue py-8 sidebar w-full max-h-screen overflow-y-auto">
            <section>
                <div class="user-photo">
                    <div class="bg-light w-44 h-44 rounded-full m-auto"></div>
                </div>
                <div class="username">
                    <h1 class="text-center text-light capitalize text-3xl mt-7 font-bold">{{$store.state.user_data.username}}</h1>
                </div>
            </section>
            <hr class="mb-6 mt-8 text-main_yellow">
            <section class="mx-7">
                <div v-for="i in 3" :key="i">
                    <router-link :to="menu[i-1].link">
                        <div class="py-3 font-normal text-xl hover:text-main_yellow cursor-pointer" :class="$route.path.includes(menu[i-1].link) ? 'text-main_yellow' : 'text-light'">
                                {{menu[i-1].name}}
                        </div>
                    </router-link>
                </div>
            </section>
            <hr class="my-6 text-main_yellow">
            <section class="mx-7">
                <router-link :to="menu[menu.length - 1].link">
                    <div class="text-light py-3 font-normal text-xl hover:text-main_yellow cursor-pointer" :class="$route.path.includes(menu[menu.length -1].link) ? 'text-main_yellow' : 'text-light'">
                            {{menu[menu.length-1].name}}
                    </div>
                </router-link>
            </section>
            <div class="absolute bottom-0 py-8 px-5 w-1/5 ml-auto">
                <button class="bg-main_red text-light w-full text-xl p-2 rounded-lg" @click="logout()">Logout</button>
            </div>
        </section>
    </div>
</template>