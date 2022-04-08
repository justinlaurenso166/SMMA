<script setup>
import SideBar from "../../components/SideBar.vue"
import radialBar from "../../components/Chart/radialBarDetail.vue"
import LineChart from "../../components/Chart/LineChart.vue"
import modal from "../../components/ModalConfirm.vue"
import Header from "../../components/Header.vue"
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import axios from "axios"
import { reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const route = useRoute();
const router = useRouter();

//reactive state
const editMesin = ref(false);
const editPenjelasan = ref(false);
const showDeleteBox = ref(false);
const date = ref([]);
const id = route.params._id;
const data_monitoring = ref();
const detail_mesin = reactive({
    id_jenis_mesin: "",
    kode_mesin: "",
    // jenis_mesin:"",
    nama_mesin: "",
    kode_sensor: "",
    lokasi_mesin: ""
});
const all_jenis_mesin = ref([]);
const penjelasan_mesin = reactive({
    spesifikasi: "",
})
const data_anomali = reactive({
    data_sensor: [],
})
const data_ai = ref([]);
const latest_data_ai = ref([]);
const pembaharuan_mesin = ref([]);

async function getMonitoringById(){
    try {
        await axios.get(`/api/mesin/get/${id}`).then((response)=>{
            console.log(response.data)
            data_monitoring.value = response.data
            detail_mesin.id_jenis_mesin = response.data[0].id_jenis_mesin
            detail_mesin.kode_mesin = response.data[0].kode_mesin
            detail_mesin.nama_mesin = response.data[0].nama_mesin
            // detail_mesin.jenis_mesin = response.data[0].jenis_mesin
            detail_mesin.kode_sensor = response.data[0].kode_sensor
            detail_mesin.lokasi_mesin = response.data[0].lokasi_mesin
            data_anomali.data_sensor = response.data[0].sensor_result.data_sensor
            data_ai.value = response.data[0].sensor_ai.data_ai;
            latest_data_ai.value = response.data[0].sensor_ai.latest_data_ai[0];
            if(response.data[0].jenis_mesin_detail){
                penjelasan_mesin.spesifikasi = response.data[0].jenis_mesin_detail.spesifikasi
            }
            else{
                penjelasan_mesin.spesifikasi = "-";
            }
            console.log(detail_mesin)
        })
    } catch (error) {
        console.log(error)
    }
}

async function editDetailMesin(){
    try {
        axios.put(`/api/mesin/edit/${id}`, detail_mesin).then((response)=>{
            if(response.status === 200){
                createToast(response.data,{
                    type: "success",
                    showCloseButton: true,
                    timeout: 3000,
                    showIcon: true,
                    transition: "zoom",
                });
                setTimeout(async()=>{
                    editMesin.value = false;
                    editPenjelasan.value = false;
                    await getMonitoringById();
                },3000)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteMonitoring(){
    try {
        await axios.delete("/api/mesin/delete/"+id+`/${detail_mesin.kode_mesin}/${detail_mesin.kode_sensor}`).then((res)=>{
            if(res.status === 200){
                createToast(res.data,{
                    type: "success",
                    showCloseButton: true,
                    timeout: 3000,
                    showIcon: true,
                    transition: "zoom",
                });
                setTimeout(()=>{
                    router.push({name: "Monitoring"});
                }, 3000)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function getJenisMesin(){
    try {
        await axios.get('/api/jenis_mesin/all').then((response)=>{
            // console.log(response.data)
            all_jenis_mesin.value = response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function pembaharuanKondisiMesin(){
    pembaharuan_mesin.value = [];
    let sensor_length = data_anomali.data_sensor.length;
    let ai_length = data_ai.value.length;

    if(sensor_length === ai_length){
        for(let i = 0; i < sensor_length; i++){
            // if(data_anomali.data_sensor[i].timestamps === data_ai.value[i].created_at){
            //     let new_obj = Object.assign({},data_anomali.data_sensor[i],data_ai.value[i]);
            //     pembaharuan_mesin.value.push(new_obj)
            // }
            let new_obj = Object.assign({},data_anomali.data_sensor[i],data_ai.value[i]);
            pembaharuan_mesin.value.push(new_obj)
        }
    }
}

function addZero(number){
    let new_number;
    if(number < 10){
        new_number = "0"+number;
    }
    else{
        new_number = number;
    }
    return new_number
}

function convertDate(date){
    let getdate = addZero(new Date(date).getDate())
    let getmonth = addZero(new Date(date).getMonth())
    let getyear = addZero(new Date(date).getFullYear())
    let gethour = addZero(new Date(date).getHours())
    let getminute =  addZero(new Date(date).getMinutes())

    return `${getdate}/${getmonth}/${getyear} - ${gethour}:${getminute}`
}

function statusMesin(kondisi){
    let status;
    if(kondisi === 100){
        status = "Mesin dalam keadaan normal"
    }
    else if(kondisi === 50){
        status = "Mesin mengalami anomali"
    }
    else{
        status = "Mesin telah rusak"
    }

    return status
}

function checkIndikasi(kondisi){
    let status;
    if(kondisi === 100){
        status = "Normal"
    }
    else if(kondisi === 50){
        status = "Anomali"
    }
    else{
        status = "Failed"
    }

    return status
}

function checkStatus(kondisi){
      let status;
    if(kondisi === 100){
        status = "Sehat"
    }
    else if(kondisi === 50){
        status = "Anomali"
    }
    else{
        status = "Failed"
    }

    return status
}


onMounted(async()=>{
    await getMonitoringById();
    date.value = [new Date(), new Date()];
    await getJenisMesin();
    pembaharuanKondisiMesin()
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
                    <div class="flex justify-between">
                        <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                            <span class="cursor-pointer" @click="$router.push({name:'Monitoring'})">Monitoring</span> / <span class="cursor-pointer" @click="$router.push({name:'DetailMonitoring'})">Detail Monitoring</span>
                        </h1>
                        <div>
                            <button class="text-xl bg-main_blue text-light py-2 px-5 rounded-lg" @click="showDeleteBox = true">Hapus</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="pt-2 pb-6 grid grid-cols-1 gap-10" v-if="data_monitoring?.length > 0">
                        <div class="bg-light b-shadow rounded-xl relative">
                            <div class="relative font-semibold">
                                <h4 class="absolute right-0 pt-5 pr-5 italic">
                                    Detail Monitoring - {{convertDate(data_monitoring[0].sensor_result.latest_data_sensor[0].timestamps)}}
                                </h4>
                            </div>
                            <div class="flex items-center">
                                <div class="2xl:w-1/3 p-3 w-1/2">
                                    <radialBar :health="data_monitoring[0].sensor_ai.latest_data_ai[0].kondisi_kesehatan" />
                                </div>
                                <div class="2xl:w-2/3 py-4 px-5 w-1/2">
                                    <div class="grid 2xl:grid-cols-3 gap-10 lg:grid-cols-1 lg:py-5">
                                        <div class="kecepatan">
                                            <h3 class="uppercase font-semibold tracking-widest 2xl:text-3xl text-xl">Kecepatan</h3>
                                            <p class="2xl:text-4xl text-2xl mt-2"><span class="font-extrabold 2xl:text-4xl lg:text-3xl">{{data_monitoring[0].sensor_result.latest_data_sensor[0].kecepatan}} </span> M/s</p>
                                        </div>
                                        <div class="percepatan">
                                            <h3 class="uppercase font-semibold tracking-widest 2xl:text-3xl text-xl">Percepatan</h3>
                                            <p class="2xl:text-4xl text-2xl mt-2"><span class="font-extrabold 2xl:text-4xl lg:text-3xl">{{data_monitoring[0].sensor_result.latest_data_sensor[0].percepatan}} </span> M/s</p>
                                        </div>
                                        <div class="suhu">
                                            <h3 class="uppercase font-semibold tracking-widest 2xl:text-3xl text-xl">Temperatur</h3>
                                            <p class="2xl:text-4xl text-2xl mt-2"><span class="font-extrabold 2xl:text-4xl lg:text-3xl">{{data_monitoring[0].sensor_result.latest_data_sensor[0].suhu}} </span> °C</p>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <h1 class="font-bold text-2xl">Indikasi Anomali Mesin</h1>
                                        <p class="text-xl mt-1">{{data_monitoring[0].sensor_ai.latest_data_ai[0].indikasi_kerusakan}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex 2xl:flex-row lg:flex-col gap-7" v-if="data_monitoring?.length > 0">
                        <div class="2xl:w-1/3 lg:w-full bg-light b-shadow py-7 px-8 rounded-xl">
                            <div class="w-6 h-6 bg-main_blue float-right rounded hover:cursor-pointer" @click="editMesin = !editMesin" v-if="$store.state.user_data.hak_akses === 1"></div>
                            <h3 class="text-center font-bold text-lg">Detail Mesin</h3>
                            <div class="info mt-5" v-if="!editMesin">
                                <div class="kode text-lg">
                                    <h3 class="font-bold">Kode Mesin</h3>
                                    <p class="">{{data_monitoring[0].kode_mesin}}</p>
                                </div>
                                <div class="nama text-lg mt-2">
                                    <h3 class="font-bold">Nama</h3>
                                    <p class="">{{data_monitoring[0].nama_mesin}}</p>
                                </div>
                                <div class="jenis text-lg mt-2">
                                    <h3 class="font-bold">Jenis Mesin</h3>
                                    <p class="" v-if="data_monitoring[0].jenis_mesin !== ''">{{data_monitoring[0].jenis_mesin}}</p>
                                    <p class="" v-else>-</p>
                                </div>
                                <div class="sensor text-lg mt-2">
                                    <h3 class="font-bold">Kode Sensor</h3>
                                    <p class="">{{data_monitoring[0].kode_sensor}}</p>
                                </div>
                            </div>
                            <div class="info mt-5" v-else>
                                <form @submit.prevent="editDetailMesin">
                                    <div class="kode text-lg">
                                        <h3 class="font-bold">Kode Mesin</h3>
                                        <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="detail_mesin.kode_mesin" disabled>
                                    </div>
                                    <div class="nama text-lg mt-2">
                                        <h3 class="font-bold">Nama</h3>
                                        <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full"  v-model="detail_mesin.nama_mesin">
                                    </div>
                                    <div class="jenis text-lg mt-2">
                                        <h3 class="font-bold">Jenis Mesin</h3>
                                        <select class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="detail_mesin.id_jenis_mesin">
                                            <option disabled value="">Pilih Jenis Mesin</option>
                                            <option v-for="jenis in all_jenis_mesin" :key="jenis._id" :value="jenis._id">
                                                {{jenis.jenis_mesin}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="sensor text-lg mt-2">
                                        <h3 class="font-bold">Kode Sensor</h3>
                                        <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" v-model="detail_mesin.kode_sensor">
                                    </div>
                                    <div class="w-44 m-auto mt-9">
                                        <button class="bg-main_blue text-light text-lg py-2 px-4 rounded-md w-full">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="2xl:w-2/3 lg:w-full bg-light b-shadow rounded-xl py-7 px-8" v-if="data_monitoring?.length > 0">
                            <div class="w-6 h-6 bg-main_blue float-right rounded hover:cursor-pointer" @click="editPenjelasan = !editPenjelasan" v-if="$store.state.user_data.hak_akses === 1"></div>
                            <h3 class="text-center font-bold text-lg">Penjelasan Mesin</h3>
                            <div class="penjelasan mt-7 text-lg" v-if="!editPenjelasan">
                                <div class="deskripsi">
                                    <h3 class="font-bold">Deskripsi</h3>
                                    <p class="text-justify mt-3">{{penjelasan_mesin.spesifikasi}}</p>
                                </div>
                                <div class="lokasi mt-5">
                                    <h3 class="font-bold">Lokasi</h3>
                                    <p class="text-justify mt-3">{{detail_mesin.lokasi_mesin}}</p>
                                </div>
                            </div>
                            <div class="penjelasan mt-7 text-lg" v-else>
                                <form @submit.prevent="editDetailMesin()">
                                    <div class="deskripsi">
                                        <h3 class="font-bold">Deskripsi</h3>
                                        <p class="text-justify mt-3">{{penjelasan_mesin.spesifikasi}}</p>
                                    </div>
                                    <div class="lokasi mt-3">
                                        <h3 class="font-bold">Lokasi</h3>
                                        <textarea class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full mt-2" rows="3"  v-model="detail_mesin.lokasi_mesin"></textarea>
                                    </div>
                                    <div class="w-44 m-auto mt-7">
                                        <button class="bg-main_blue text-light text-lg py-2 px-4 rounded-md w-full">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="table bg-light b-shadow w-full px-8 py-6 mt-6 rounded-xl">
                        <h3 class="text-center font-bold text-lg">Pembaharuan Kondisi Mesin</h3>
                        <table class="table-auto w-full border-collapse border border-main_blue mt-4">
                            <tr class="text-lg">
                                <th class="border border-main_blue py-2">No.</th>
                                <th class="border border-main_blue py-2">Waktu</th>
                                <th class="border border-main_blue py-2">Penjelasan</th>
                                <th class="border border-main_blue py-2">Temp<br><span class="text-sm">(°C)</span></th>
                                <th class="border border-main_blue py-2">V<br><span class="text-sm">(m/s)</span></th>
                                <th class="border border-main_blue py-2">A<br><span class="text-sm">(m/s)</span></th>
                                <th class="border border-main_blue py-2">Indikasi</th>
                                <th class="border border-main_blue py-2">Status</th>
                            </tr>
                            <tr v-for="(info,i) in pembaharuan_mesin" :key="i">
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center p-2 text-lg font-medium border-l">{{i+1}}.</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l text-center">
                                    <span class="cursor-pointer">{{convertDate(info.timestamps)}}</span>
                                </td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l">{{statusMesin(info.kondisi_kesehatan)}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l text-center">{{info.suhu}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l text-center">{{info.percepatan}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l text-center">{{info.kecepatan}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l text-center">{{checkIndikasi(info.kondisi_kesehatan)}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center px-4 py-3 text-lg font-medium border-l">
                                    <div class="uppercase font-bold py-1 rounded-md" :class="[info.kondisi_kesehatan === 100 ? 'bg-green-200 text-main_black' : '', info.kondisi_kesehatan === 50 ? 'bg-yellow-200 text-main_black' : '',info.kondisi_kesehatan === 0 ? 'bg-red-200 text-light' : '']">
                                        {{checkStatus(info.kondisi_kesehatan)}}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="chart">
                    <div class="bg-light b-shadow py-6 px-7 rounded-2xl">
                        <div class="flex justify-between text-lg">
                            <div>
                                    <select class="cursor-pointer focus:outline-none ml-6">
                                        <option>Percepatan</option>
                                        <option>Kecepatan</option>
                                        <option>Temperatur</option>
                                    </select>
                                    <select class="cursor-pointer focus:outline-none text-xl ml-8">
                                        <option>Harian</option>
                                        <option>Mingguan</option>
                                        <option>Bulanan</option>
                                    </select>
                                </div>
                            <div>
                                <Datepicker autoApply :enableTimePicker="false" range v-model="date" :clearable="false" class="w-60"></Datepicker>
                            </div>
                        </div>
                        <div class="mt-5" v-if="data_anomali.data_sensor.length > 0">
                            <line-chart :data_sensor="data_anomali.data_sensor"></line-chart>
                        </div>
                    </div>
                </div>
                <modal v-if="showDeleteBox">
                    <template v-slot:header>
                        <h1 class="text-center text-2xl font-bold text-main_blue">Konfimasi Penghapusan</h1>
                    </template>
                    <template v-slot:body>
                        <div class="mt-8">
                            <h3 class="text-xl text-center font-semibold">Apakah Anda yakin ingin menghapus monitoring mesin ini ?</h3>
                            <p class="text-center text-lg font-medium mt-2">Data akan terhapus selamanya</p>
                            <div class="flex gap-12 mt-10">
                                <button class="flex-1 bg-red-200 text-light text-lg text-semibold py-2.5 rounded-lg" @click="showDeleteBox = false">Batal</button>
                                <button class="flex-1 bg-main_blue text-light text-lg text-semibold py-2.5 rounded-lg" @click="deleteMonitoring()">Ya, hapus data ini</button>
                            </div>
                        </div>
                    </template>
                </modal>
            </section>
        </div>
    </div>
</template>