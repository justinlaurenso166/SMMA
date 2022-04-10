<script setup>
import SideBar from "../../components/SideBar.vue"
import axios from "axios"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import Header from "../../components/Header.vue"

const route = useRoute();

//------------REACTIVE STATE-------------
const jenis_mesin = ref([]);
const id = route.params._id;
const daftar_mesin = ref([]);

async function getJenisMesinById(){
    try {
        await axios.get(`/api/jenis_mesin/${id}`).then((response)=>{
            console.log(response.data)
            jenis_mesin.value = response.data
        })
    } catch (error) {
        console.log(error)
    }
}

async function getDaftarMesin(){
    try {
        await axios.get('/api/jenis_mesin/daftar_mesin/'+id).then((res)=>{
            console.log(res.data)
            daftar_mesin.value = res.data
        })
    } catch (error) {
        console.log(error)
    }
}

//mount first time
onMounted(async()=>{
    await getJenisMesinById();
    await getDaftarMesin();
})
</script>

<style scoped>
    .b-shadow{
        box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.25);
    }
    input[type=text]:disabled{
        background-color: #cacaca;
    }
</style>

<template>
    <div class="flex bg-gray-100">
        <div >
            <SideBar />
        </div>
        <div class="w-full overflow-y-auto h-screen">
            <Header />
            <section class="p-10 flex flex-col gap-9">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">Jenis Mesin</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                        <span class="cursor-pointer" @click="$router.push({name:'JenisMesin'})">Jenis Mesin</span> / <span class="cursor-pointer" @click="$router.push({name:'DetailMesin'})">Detail Jenis Mesin</span>
                    </h1>
                </div>

                <div>
                    <div class="flex justify-end" v-if="$store.state.user_data.hak_akses === 1">
                        <button class="text-light bg-main_blue text-xl px-6 py-3 rounded-xl" @click="$router.push({name:'EditJenisMesin',params:{_id: $route.params._id}})">
                            Ubah <img src="../../assets/svg/Edit.svg" class="inline w-7 -mt-1 ml-1">
                        </button>
                    </div>
                    <div class="mt-7 flex gap-7 2xl:flex-row lg:flex-col">
                        <div class="2xl:w-1/3 lg:w-full">
                            <div class=" bg-light b-shadow py-7 px-8 rounded-xl">
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
                                        <p class="text-justify w-full break-words">
                                            {{jenis_mesin.spesifikasi}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-light b-shadow w-full px-8 py-6 mt-8 rounded-xl">
                                <div class="list_mesin">
                                    <h3 class="text-center font-bold text-lg mb-4">Daftar Mesin Monitoring</h3>
                                    <p v-for="(daftar, idx) in daftar_mesin" :key="daftar._id" class="mt-1">
                                        <span>{{idx+1}}. </span>
                                        <span>{{daftar.nama_mesin}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="2xL:w-2/3 lg:w-full bg-light b-shadow rounded-xl py-7 px-8 self-start">
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