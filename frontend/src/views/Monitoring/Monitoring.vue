<script setup>
import SideBar from "../../components/SideBar.vue"
import radialBar from "../../components/Chart/radialBar.vue"
import Modal from "../../components/ModalConfirm.vue"
import { ref } from "@vue/reactivity"

//reactive state
const addMesinBaru = ref(false);

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
                    <h1 class="font-bold text-gray-200 text-4xl">Monitoring</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">Monitoring / </h1>
                </div>

                <div>
                    <div class="flex justify-end">
                        <button class="text-light bg-main_blue text-xl px-6 py-3 rounded-xl" @click="addMesinBaru = true">Tambah +</button>
                    </div>
                    <div class="py-6 mt-4 grid 2xl:grid-cols-2 gap-10 md:grid-cols-1">
                        <div class="bg-light b-shadow rounded-xl hover:cursor-pointer" @click="$router.push({name: 'DetailMonitoring',params:{_id:'123'}})">
                            <div class="flex justify-between px-10 py-5 text-lg bg-green-100 shadow-lg">
                                <p>Mesin 2281288</p>
                                <p>Motor-Kecil</p>
                            </div>
                            <div class="flex items-center">
                                <div class="w-1/2 p-3">
                                    <radialBar :health="70" />
                                </div>
                                <div class="w-1/2 py-4 px-10">
                                    <div class="kecepatan">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Kecepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">160 </span> M/s</p>
                                    </div>
                                    <div class="percepatan mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Percepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">120 </span> M/s</p>
                                    </div>
                                    <div class="suhu mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Temperatur</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">217 </span> °F</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-light b-shadow rounded-xl">
                            <div class="flex justify-between px-10 py-5 text-lg bg-green-100 shadow-lg">
                                <p>Mesin 2281288</p>
                                <p>Motor-Kecil</p>
                            </div>
                            <div class="flex items-center">
                                <div class="w-1/2 p-3">
                                    <radialBar :health="80" />
                                </div>
                                <div class="w-1/2 py-4 px-10">
                                    <div class="kecepatan">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Kecepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">160 </span> M/s</p>
                                    </div>
                                    <div class="percepatan mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Percepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">120 </span> M/s</p>
                                    </div>
                                    <div class="suhu mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Temperatur</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">217 </span> °F</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="bg-light b-shadow rounded-xl">
                            <div class="flex justify-between px-10 py-5 text-lg bg-yellow-100 shadow-lg">
                                <p>Mesin 2281288</p>
                                <p>Motor-Kecil</p>
                            </div>
                            <div class="flex items-center">
                                <div class="w-1/2 p-3">
                                    <radialBar :health="60" />
                                </div>
                                <div class="w-1/2 py-4 px-10">
                                    <div class="kecepatan">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Kecepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">160 </span> M/s</p>
                                    </div>
                                    <div class="percepatan mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Percepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">120 </span> M/s</p>
                                    </div>
                                    <div class="suhu mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Temperatur</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">217 </span> °F</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="bg-light b-shadow rounded-xl">
                            <div class="flex justify-between px-10 py-5 text-lg bg-red-100 shadow-lg">
                                <p>Mesin 2281288</p>
                                <p>Motor-Kecil</p>
                            </div>
                            <div class="flex items-center">
                                <div class="w-1/2 p-3">
                                    <radialBar :health="35" />
                                </div>
                                <div class="w-1/2 py-4 px-10">
                                    <div class="kecepatan">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Kecepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">160 </span> M/s</p>
                                    </div>
                                    <div class="percepatan mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Percepatan</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">120 </span> M/s</p>
                                    </div>
                                    <div class="suhu mt-5">
                                        <h3 class="uppercase font-bold tracking-widest text-xl">Temperatur</h3>
                                        <p class="text-2xl"><span class="font-bold text-4xl">217 </span> °F</p>
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
                    <div class="flex text-lg items-center mt-5">
                        <div class="flex-1 font-bold">Kode - Monitoring</div>
                        <div class="flex-1">MSN-001</div>
                    </div>
                    <div class="flex text-lg items-center mt-2">
                        <div class="flex-1 font-bold">Nama</div>
                        <div class="flex-1">
                            <input type="text" class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full">
                        </div>
                    </div>
                    <div class="flex text-lg items-center mt-2">
                        <div class="flex-1 font-bold">Jenis Mesin</div>
                        <div class="flex-1">
                            <input type="text" class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full">
                        </div>
                    </div>
                    <div class="flex text-lg items-center mt-2">
                        <div class="flex-1 font-bold">Kode Sensor</div>
                        <div class="flex-1">
                            <input type="text" class="border-2 border-main_blue bg-gray-100 rounded-lg px-3 py-1 w-full">
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
                </template>
            </modal>
        </div>
    </div>
</template>