<script setup>
import SideBar from "../../components/SideBar.vue"
import radialBar from "../../components/Chart/radialBar.vue"
import Modal from "../../components/ModalConfirm.vue"
import { reactive, ref } from "@vue/reactivity"
import axios from "axios"
import { onMounted } from "@vue/runtime-core";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import Header from "../../components/Header.vue"

//reactive state
const addMesinBaru = ref(false);
const all_mesin = ref([]);
const all_jenis_mesin = ref([]);
const list_sensor = ref([]);
const new_mesin = reactive({
    kode_mesin: "",
    nama_mesin: "",
    id_jenis_mesin: "",
    lokasi_mesin: "",
    timestamps: new Date(),
    kode_sensor: "",
})

async function getAllMonitoring(){
    try {
        await axios.get("/api/mesin/all").then((response)=>{
            console.log(response.data)
            all_mesin.value = response.data;
        })
    } catch (error) {
        console.log(error)
    }
}

async function getJenisMesin(){
    try {
        await axios.get('/api/jenis_mesin/all').then((response)=>{
            console.log(response.data)
            all_jenis_mesin.value = response.data
        })
    } catch (error) {
        console.log(error)
    }
}

async function addMonitoring(){
    try {
        await axios.post("/api/mesin/add", new_mesin).then((response)=>{
            if(response.status === 200){
                createToast(response.data,{
                    type: "success",
                    showCloseButton: true,
                    timeout: 3000,
                    showIcon: true,
                    transition: "zoom",
                });
                addMesinBaru.value = false;
                getAllMonitoring();
            }
        })
    } catch (error) {
        if(error.response){
            createToast(error.response.data,{
                toastBackgroundColor: "red",
                showCloseButton: true,
                timeout: 3000,
                transition: "zoom",
            });
        }
    }
}

onMounted(async()=>{
    await getAllMonitoring();
    await getJenisMesin();
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
            <Header />
            <section class="p-10 flex flex-col gap-7">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">Monitoring</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">Monitoring / </h1>
                </div>

                <div>
                    <div class="flex justify-end" v-if="$store.state.user_data.hak_akses === 1">
                        <button class="text-light bg-main_blue text-xl px-6 py-3 rounded-xl" @click="addMesinBaru = true">Tambah +</button>
                    </div>
                    <div class="pb-6 pt-2 mt-4 grid 2xl:grid-cols-2 gap-10 md:grid-cols-1">
                    <div class="bg-light b-shadow rounded-xl hover:cursor-pointer" @click="$router.push({name: 'DetailMonitoring',params:{_id:mesin._id}})" v-for="mesin in all_mesin" :key="mesin._id">
                            <div class="flex justify-between px-10 py-5 text-lg shadow-lg" :class="[mesin.sensor_ai.latest_data_ai[0].kondisi_kesehatan === 100 ? 'bg-green-100' : '', mesin.sensor_ai.latest_data_ai[0].kondisi_kesehatan === 50 ? 'bg-yellow-100' : '',mesin.sensor_ai.latest_data_ai[0].kondisi_kesehatan === 0 ? 'bg-red-100' : '']">
                                <p>{{mesin.nama_mesin}} | {{mesin.kode_mesin}}</p>
                                <p>{{mesin.jenis_mesin}}</p>
                            </div>
                            <div class="flex items-center">
                                <div class="w-1/2 p-3">
                                    <radialBar :health="mesin.sensor_ai.latest_data_ai[0].kondisi_kesehatan" />
                                </div>
                                <div class="w-1/2 py-4 px-10">
                                    <div class="kecepatan">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Kecepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">{{mesin.sensor_result.latest_data_sensor[0].kecepatan}} </span> M/s</p>
                                    </div>
                                    <div class="percepatan mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Percepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">{{mesin.sensor_result.latest_data_sensor[0].percepatan}} </span> M/s</p>
                                    </div>
                                    <div class="suhu mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Temperatur</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">{{mesin.sensor_result.latest_data_sensor[0].suhu}} </span> °C</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <modal v-if="addMesinBaru">
                <template v-slot:header>
                    <h3 class="text-xl font-bold text-center">Tambah Mesin</h3>
                </template>
                <template v-slot:body>
                    <form @submit.prevent="addMonitoring">
                        <div class="flex text-lg items-center mt-5">
                            <div class="flex-0 w-1/3 font-bold">Kode Mesin</div>
                            <div class="flex-1">
                                <input required type="text" class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="new_mesin.kode_mesin">
                            </div>
                        </div>
                        <div class="flex text-lg items-center mt-2">
                            <div class="flex-0 w-1/3 font-bold">Nama Mesin</div>
                            <div class="flex-1">
                                <input required type="text" class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="new_mesin.nama_mesin">
                            </div>
                        </div>
                        <div class="flex text-lg items-center mt-2">
                            <div class="flex-0 w-1/3 font-bold">Jenis Mesin</div>
                            <div class="flex-1">
                                <select required class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="new_mesin.id_jenis_mesin">
                                    <option disabled value="">Pilih Jenis Mesin</option>
                                    <option v-for="jenis in all_jenis_mesin" :key="jenis._id" :value="jenis._id">
                                        {{jenis.jenis_mesin}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="flex text-lg items-center mt-2">
                            <div class="flex-0 w-1/3 font-bold">Kode Sensor</div>
                            <div class="flex-1">
                                <input required type="text" class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="new_mesin.kode_sensor">
                            </div>
                        </div>
                        <div class="flex text-lg items-center mt-2">
                            <div class="flex-0 w-1/3 font-bold">Lokasi</div>
                            <div class="flex-1">
                                <textarea required class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" rows="4" v-model="new_mesin.lokasi_mesin"></textarea>
                            </div>
                        </div>
                        <div class="flex gap-8 w-72 m-auto mt-10">
                            <div class="flex-1">
                                <button class="bg-red-200 w-full text-light font-semibold text-lg rounded-lg py-2" @click="addMesinBaru = false">Cancel</button>
                            </div>
                            <div class="flex-1">
                                <button class="bg-main_blue w-full text-light font-semibold text-lg rounded-lg py-2">Save</button>
                            </div>
                        </div>
                    </form>
                </template>
            </modal>
        </div>
    </div>
</template>