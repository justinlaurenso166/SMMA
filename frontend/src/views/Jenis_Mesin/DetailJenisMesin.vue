<script setup>
import SideBar from "../../components/SideBar.vue"
import axios from "axios"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const route = useRoute();

//------------REACTIVE STATE-------------
const jenis_mesin = ref([]);
const id = route.params._id;

async function getJenisMesinById(){
    await axios.get(`/api/jenis_mesin/${id}`).then((response)=>{
        console.log(response.data)
        jenis_mesin.value = response.data
    })
}


//mount first time
onMounted(async()=>{
    await getJenisMesinById();
})
</script>

<style scoped>
    .b-shadow{
        box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.25);
    }
</style>

<template>
    <div class="flex bg-gray-100">
        <div >
            <SideBar />
        </div>
        <div class="w-full overflow-y-auto h-screen">
            <header class="bg-light px-7 py-5 flex justify-between sticky top-0 z-50" style="box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);">
                <div>
                    <input type="text" placeholder="Search For..." class="border border-main_blue px-3 py-1.5 rounded-md w-80 text-xl focus:outline-none">
                </div>
                <div class="flex items-center">
                    <span class="capitalize mr-5 text-2xl font-medium">
                        {{$store.state.user_data.username}}
                    </span>
                    <div class="border w-9 h-9 rounded-full"></div>
                </div>
            </header>
            <section class="p-10 flex flex-col gap-9">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">Jenis Mesin</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                        <span class="cursor-pointer" @click="$router.push({name:'JenisMesin'})">Jenis Mesin</span> / <span class="cursor-pointer" @click="$router.push({name:'DetailMesin'})">Detail Jenis Mesin</span>
                    </h1>
                </div>

                <div>
                    <div class="flex gap-7">
                        <div class="w-1/3 bg-light b-shadow py-7 px-8 rounded-xl">
                            <div class="w-6 h-6 bg-main_blue float-right rounded hover:cursor-pointer" @click="$router.push({name:'EditJenisMesin',params:{_id:$route.params._id}})" v-if="$store.state.user_data.hak_akses === 1"></div>
                            <h3 class="text-center font-bold text-lg">Informasi Umum</h3>
                            <div class="info mt-3">
                                <div class="kode text-lg">
                                    <h3 class="font-bold">Kode</h3>
                                    <p class="">{{jenis_mesin.kode_jenis_mesin}}</p>
                                </div>
                                <div class="nama text-lg mt-2">
                                    <h3 class="font-bold">Nama</h3>
                                    <p class="">{{jenis_mesin.jenis_mesin}}</p>
                                </div>
                                <div class="desc text-lg mt-2">
                                    <h3 class="font-bold">Deskripsi</h3>
                                    <p class="text-justify">
                                        {{jenis_mesin.spesifikasi}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-2/3 bg-light b-shadow rounded-xl py-7 px-8 self-start">
                            <h3 class="text-center font-bold text-lg">Daftar Kerusakan</h3>
                            <div class="form mt-7">
                                <div class="list mt-5 text-lg">
                                    <h3 class="font-bold">Kerusakan Mesin</h3>
                                    <p v-for="(kerusakan, idx) in jenis_mesin.kerusakan" :key="kerusakan._id">
                                        <span>{{idx+1}}. </span>
                                        <span>{{kerusakan.nama}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>