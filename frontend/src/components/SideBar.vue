<script setup>

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
</script>

<style scoped>
.sidebar{
    /* box-shadow: 44x 2px 3px rgba(0, 79, 155, 0.25); */
}    
</style>

<template>
    <div>
        <section class="h-screen bg-main_blue py-8 sidebar w-full">
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
                    <div class="text-light py-3 font-normal text-xl hover:text-main_yellow cursor-pointer">
                        <router-link :to="menu[i-1].link">
                            {{menu[i-1].name}}
                        </router-link>
                    </div>
                </div>
            </section>
            <hr class="my-6 text-main_yellow">
            <section class="mx-7">
                <div class="text-light py-3 font-normal text-xl hover:text-main_yellow cursor-pointer">
                    <router-link :to="menu[menu.length - 1].link">
                        {{menu[menu.length-1].name}}
                    </router-link>
                </div>
            </section>
            <!-- <div class="absolute bottom-0 py-8 px-5 w-1/5 ml-auto">
                <button class="bg-main_red text-light w-full text-xl p-2 rounded-lg">Logout</button>
            </div> -->
        </section>
    </div>
</template>