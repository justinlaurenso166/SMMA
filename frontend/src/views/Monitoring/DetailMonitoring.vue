<script setup>
import SideBar from "../../components/SideBar.vue"
import radialBar from "../../components/Chart/radialBarDetail.vue"
import LineChart from "../../components/Chart/LineChart.vue"
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";

//reactive state
const editMesin = ref(false);
const editPenjelasan = ref(false);
const date = ref([]);

onMounted(()=>{
    date.value = [new Date(), new Date()];
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
            <section class="p-10 flex flex-col gap-7">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">Monitoring</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                        <span class="cursor-pointer" @click="$router.push({name:'Monitoring'})">Monitoring</span> / <span class="cursor-pointer" @click="$router.push({name:'DetailMonitoring'})">Detail Monitoring</span>
                    </h1>
                </div>

                <div>
                    <div class="pt-2 pb-6 grid grid-cols-1 gap-10">
                        <div class="bg-light b-shadow rounded-xl">
                            <div class="flex items-center">
                                <div class="2xl:w-1/3 p-3 w-1/2">
                                    <radialBar :health="70" />
                                </div>
                                <div class="2xl:w-2/3 py-4 px-5 w-1/2">
                                    <div class="grid 2xl:grid-cols-3 gap-10 lg:grid-cols-1 lg:py-5">
                                        <div class="kecepatan">
                                            <h3 class="uppercase font-semibold tracking-widest 2xl:text-3xl text-xl">Kecepatan</h3>
                                            <p class="2xl:text-4xl text-2xl mt-2"><span class="font-extrabold 2xl:text-4xl lg:text-3xl">160 </span> M/s</p>
                                        </div>
                                        <div class="percepatan">
                                            <h3 class="uppercase font-semibold tracking-widest 2xl:text-3xl text-xl">Percepatan</h3>
                                            <p class="2xl:text-4xl text-2xl mt-2"><span class="font-extrabold 2xl:text-4xl lg:text-3xl">120 </span> M/s</p>
                                        </div>
                                        <div class="suhu">
                                            <h3 class="uppercase font-semibold tracking-widest 2xl:text-3xl text-xl">Temperatur</h3>
                                            <p class="2xl:text-4xl text-2xl mt-2"><span class="font-extrabold 2xl:text-4xl lg:text-3xl">217 </span> °F</p>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <h1 class="font-bold text-2xl">Indkasi Anomali Mesin</h1>
                                        <p class="text-xl mt-1">Mesin dalam kondisi normal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex gap-7">
                        <div class="w-1/3 bg-light b-shadow py-7 px-8 rounded-xl">
                            <div class="w-6 h-6 bg-main_blue float-right rounded hover:cursor-pointer" @click="editMesin = !editMesin"></div>
                            <h3 class="text-center font-bold text-lg">Detail Mesin</h3>
                            <div class="info mt-5" v-if="!editMesin">
                                <div class="kode text-lg">
                                    <h3 class="font-bold">Kode - Monitoring</h3>
                                    <p class="">MSN-001</p>
                                </div>
                                <div class="nama text-lg mt-2">
                                    <h3 class="font-bold">Nama</h3>
                                    <p class="">Monitoring-001</p>
                                </div>
                                <div class="jenis text-lg mt-2">
                                    <h3 class="font-bold">Jenis Mesin</h3>
                                    <p class="">Motor-Kecil</p>
                                </div>
                                <div class="sensor text-lg mt-2">
                                    <h3 class="font-bold">Kode Sensor</h3>
                                    <p class="">SS-001</p>
                                </div>
                            </div>
                            <div class="info mt-5" v-else>
                                <div class="kode text-lg">
                                    <h3 class="font-bold">Kode - Monitoring</h3>
                                    <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" value="MSN-001">
                                </div>
                                <div class="nama text-lg mt-2">
                                    <h3 class="font-bold">Nama</h3>
                                    <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" value="Monitoring-001">
                                </div>
                                <div class="jenis text-lg mt-2">
                                    <h3 class="font-bold">Jenis Mesin</h3>
                                    <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" value="Motor-Kecil">
                                </div>
                                <div class="sensor text-lg mt-2">
                                    <h3 class="font-bold">Kode Sensor</h3>
                                    <input type="text" class="mt-1 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" value="SS-001">
                                </div>
                                <div class="w-44 m-auto mt-9">
                                    <button class="bg-main_blue text-light text-lg py-2 px-4 rounded-md w-full">Save Changes</button>
                                </div>
                            </div>
                        </div>
                        <div class="w-2/3 bg-light b-shadow rounded-xl py-7 px-8">
                            <div class="w-6 h-6 bg-main_blue float-right rounded hover:cursor-pointer" @click="editPenjelasan = !editPenjelasan"></div>
                            <h3 class="text-center font-bold text-lg">Penjelasan Mesin</h3>
                            <div class="penjelasan mt-7 text-lg" v-if="!editPenjelasan">
                                <div class="deskripsi">
                                    <h3 class="font-bold">Deskripsi</h3>
                                    <p class="text-justify mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam blanditiis laboriosam cum corrupti doloremque commodi quo, sint odio rem quisquam nisi maxime aspernatur et voluptatum. Velit laboriosam libero expedita unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia laudantium eligendi ullam, dolore ipsa quia, eaque nisi amet recusandae est laborum minima earum pariatur porro, veritatis in necessitatibus et.</p>
                                </div>
                                <div class="lokasi mt-5">
                                    <h3 class="font-bold">Lokasi</h3>
                                    <p class="text-justify mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores unde in fugiat temporibus aliquid laborum harum mollitia enim cupiditate placeat, hic excepturi impedit! Debitis, illum accusantium. Consectetur, fuga. Error, ipsum.</p>
                                </div>
                            </div>
                            <div class="penjelasan mt-7 text-lg" v-else>
                                <div class="deskripsi">
                                    <h3 class="font-bold">Deskripsi</h3>
                                    <textarea class="mt-2 border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full" rows="6" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam blanditiis laboriosam cum corrupti doloremque commodi quo, sint odio rem quisquam nisi maxime aspernatur et voluptatum. Velit laboriosam libero expedita unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia laudantium eligendi ullam, dolore ipsa quia, eaque nisi amet recusandae est laborum minima earum pariatur porro, veritatis in necessitatibus et</textarea>
                                </div>
                                <div class="lokasi mt-3">
                                    <h3 class="font-bold">Lokasi</h3>
                                    <textarea class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full mt-2" rows="4" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores unde in fugiat temporibus aliquid laborum harum mollitia enim cupiditate placeat, hic excepturi impedit! Debitis, illum accusantium. Consectetur, fuga. Error, ipsum.</textarea>
                                </div>
                                <div class="w-44 m-auto mt-7">
                                    <button class="bg-main_blue text-light text-lg py-2 px-4 rounded-md w-full">Save Changes</button>
                                </div>
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
                                <th class="border border-main_blue py-2">Status</th>
                            </tr>
                            <tr v-for="i in 4" :key="i">
                                <td :class="i%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center p-2 text-lg font-medium border-l">{{i}}.</td>
                                <td :class="i%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l">
                                    <span class="cursor-pointer" @click="$router.push({name: 'DetailJenisMesin',params:{_id: `MSN-00${i}`}})">1{{i}}/03/22 - 1{{i}}.00</span>
                                </td>
                                <td :class="i%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l">Mesin dalam kondisi normal</td>
                                <td :class="i%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center px-4 py-3 text-lg font-medium border-l">
                                    <div class="bg-green-200 uppercase text-main_black font-bold py-1">
                                        Sehat
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
                        <div class="mt-5">
                            <line-chart></line-chart>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>