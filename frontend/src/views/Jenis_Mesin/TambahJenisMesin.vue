<script setup>
import SideBar from "../../components/SideBar.vue"
import axios from "axios"
import { reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import ObjectId from "bson-objectid";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { useRouter } from "vue-router";
import Header from "../../components/Header.vue"

const router = useRouter();

const jenis_mesin_baru = reactive({
    kode_jenis_mesin: "",
    jenis_mesin: "",
    spesifikasi: "",
    kerusakan: [],
})
const alert = reactive({
    error: false,
})

const new_kerusakan = ref("");

async function addJenisMesin(){
    // console.log(jenis_mesin_baru)
    try {
        await axios.post(`/api/jenis_mesin/tambah`, jenis_mesin_baru).then((response)=>{
            if(response.status === 200){
                console.log(response.data)
                createToast(response.data,{
                    type: "success",
                    showCloseButton: true,
                    timeout: 3000,
                    showIcon: true,
                    transition: "zoom",
                });
                setTimeout(()=>{
                    router.push({name: "JenisMesin"})
                },3000)
            }
        })
    } catch (error) {
        if(error.response){
            console.log(error.response.data)
            alert.error = true;
            // setTimeout(()=>{})
            createToast(error.response.data,{
                toastBackgroundColor: "red",
                showCloseButton: true,
                timeout: 3000,
                transition: "zoom",
            });
        }
    }
}

function addKerusakan(){
    if(new_kerusakan.value !== ''){
        let new_data = {
            _id: new ObjectId().toString(),
            nama: new_kerusakan.value,
        }
        jenis_mesin_baru.kerusakan.push(new_data);
        new_kerusakan.value = "";
        console.log(jenis_mesin_baru.kerusakan)
    }
    else{
        new_kerusakan.value = "";
    }
}

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
            <Header />
            <section class="p-10 flex flex-col gap-9">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">Jenis Mesin</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                        <span class="cursor-pointer" @click="$router.push({name:'JenisMesin'})">Jenis Mesin</span> / <span class="cursor-pointer" @click="$router.push({name:'EditJenisMesin'})">Tambah Jenis Mesin</span>
                    </h1>
                </div>

                <div>
                    <div class="flex gap-7">
                        <div class="w-1/3 bg-light b-shadow py-7 px-8 rounded-xl">
                            <h3 class="text-center font-bold text-lg">Informasi Umum</h3>
                            <div class="info mt-3">
                                <form @submit.prevent="addJenisMesin()">
                                    <div class="kode text-lg">
                                        <h3 class="font-bold text-gray-200 uppercase tracking-wide">Kode</h3>
                                        <input required type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1" :class="alert.error ? 'border-red-200' : 'border-main_blue'" placeholder="Kode Jenis Mesin..." v-model="jenis_mesin_baru.kode_jenis_mesin">
                                    </div>
                                    <div class="nama text-lg mt-4">
                                        <h3 class="font-bold text-gray-200 uppercase tracking-wide">Nama</h3>
                                        <input required type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1" placeholder="Nama Jenis Mesin..." v-model="jenis_mesin_baru.jenis_mesin">
                                    </div>
                                    <div class="desc text-lg mt-4">
                                        <h3 class="font-bold text-gray-200 uppercase tracking-wide">Deskripsi</h3>
                                        <textarea class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1" rows="7" placeholder="Deskripsi..." v-model="jenis_mesin_baru.spesifikasi"></textarea>
                                    </div>

                                    <div class="save_changes w-52 m-auto mt-5">
                                        <button class="bg-main_blue text-light text-lg px-3 p-3 w-full rounded-xl">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="w-2/3 bg-light b-shadow rounded-xl py-7 px-8 self-start">
                            <h3 class="text-center font-bold text-lg">Daftar Kerusakan</h3>
                            <div class="form mt-7">
                                <div class="add_kerusakan">
                                    <div class="flex gap-7">
                                        <input type="text" placeholder="Tambah Kerusakan..." class="w-full bg-gray-50 focus:outline-none py-3 px-3" v-model="new_kerusakan">
                                    <div class="text-4xl bg-main_blue text-light px-4 py-1 rounded-md" @click="addKerusakan()"> + </div>
                                    </div>
                                </div>
                                <div class="list mt-5 text-lg">
                                    <h3 class="font-bold">Kerusakan Mesin</h3>
                                    <p v-for="(kerusakan, idx) in jenis_mesin_baru.kerusakan" :key="kerusakan._id">
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