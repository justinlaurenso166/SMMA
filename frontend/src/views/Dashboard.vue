<script setup>
import SideBar from "../components/SideBar.vue"
import LineChart from "../components/Chart/LineChart.vue"

</script>

<style scoped>
    .bar{
        background: linear-gradient(90deg, #FF0000 -7.14%, #FFF000 88.18%);
    }
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
                    <h1 class="font-bold text-gray-200 text-4xl">Dashboard</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">Dashboard / </h1>
                </div>
                <div class="detail">
                    <div class="grid lg:grid-cols-4 gap-7 grid-cols-1">
                        <div class="bg-light rounded-2xl b-shadow">
                            <div class="side w-10 bg-main_blue h-full float-left rounded-lg"></div>
                            <div class="flex items-center px-7 justify-center">
                                <span class="number text-main_black" style="font-size: 70px">2</span>
                                <div class="desc px-7 text-lg font-bold text-main_black">Jenis Mesin</div>
                            </div>
                        </div>
                        <div class="bg-light rounded-2xl b-shadow">
                            <div class="side w-10 bg-main_blue h-full float-left rounded-lg"></div>
                            <div class="flex items-center px-7 justify-center">
                                <span class="number text-main_black" style="font-size: 70px">6</span>
                                <div class="desc px-7 text-lg font-bold text-main_black">Monitoring Mesin</div>
                            </div>
                        </div>
                        <div class="bg-light rounded-2xl b-shadow">
                            <div class="side w-10 bg-main_blue h-full float-left rounded-lg"></div>
                            <div class="flex flex-col items-center px-7 justify-center h-full">
                                <span class="desc text-lg font-bold text-main_black">Kesehatan Mesin</span>
                                <div class="w-full h-7 mt-2 border rounded-lg bar-cont">
                                    <div class="bar w-3/4 h-full rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-light rounded-2xl b-shadow">
                            <div class="side w-10 bg-main_blue h-full float-left rounded-lg"></div>
                            <div class="flex items-center px-7 justify-center">
                                <span class="number text-main_black" style="font-size: 70px">1</span>
                                <div class="desc px-7 text-lg font-bold text-main_black">Pengguna</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mesin">
                    <div class="grid grid-cols-3 gap-7">
                        <div class="bg-light b-shadow py-6 px-7 rounded-2xl">
                            <h3 class="text-left font-bold text-xl">Jenis Mesin</h3>
                            <div class="list mt-4 text-lg">
                                <div class="flex justify-between">
                                    <p>
                                        <span>1. </span>
                                        <span>Motor Besar</span>
                                    </p>
                                    <p>3</p>
                                </div>
                                <div class="flex justify-between">
                                    <p>
                                        <span>2. </span>
                                        <span>Motor Sedang</span>
                                    </p>
                                    <p>3</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-light b-shadow py-6 px-7 rounded-2xl">
                            <h3 class="text-left font-bold text-xl">Monitoring</h3>
                            <div class="list mt-4 text-lg">
                                <div v-for="i in 6" :key="i">
                                    <p>
                                        <span>{{i}}. </span>
                                        <span>Mesin 2281288</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-light b-shadow py-6 px-7 rounded-2xl">
                            <h3 class="text-left font-bold text-xl">Pemberitahuan</h3>
                            <div class="list mt-4 text-lg">
                                <div v-for="i in 3" :key="i">
                                    <p>
                                        <span>{{i}}. </span>
                                        <span>Terjadi Anomali Pada Mesin RITI3200</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kesehatan">
                    <div class="bg-light b-shadow py-6 px-7 rounded-2xl">
                            <h3 class="text-left font-bold text-xl">Kesehatan Mesin</h3>
                            <div class="list mt-4 text-lg">
                                <div class="mt-3">
                                    <h3>Mesin RITI3200</h3>
                                    <div class="w-full h-7 mt-2 border rounded-lg">
                                        <div class="bar w-3/4 h-full rounded-lg"></div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <h3>Mesin RITI3200</h3>
                                    <div class="w-full h-7 mt-2 border rounded-lg">
                                        <div class="bar w-2/4 h-full rounded-lg"></div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <h3>Mesin RITI3200</h3>
                                    <div class="w-full h-7 mt-2 border rounded-lg">
                                        <div class="bar w-1/3 h-full rounded-lg"></div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <h3>Mesin RITI3200</h3>
                                    <div class="w-full h-7 mt-2 border rounded-lg">
                                        <div class="bar w-3/5 h-full rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="chart">
                    <div class="bg-light b-shadow py-6 px-7 rounded-2xl">
                        <h3 class="text-left font-bold text-xl">Mesin membutuhkan Perhatian</h3>
                        <div class="flex justify-between">
                            <h3 class="text-xl my-4">Mesin RITI3200 </h3>
                            <div>
                                <select class="cursor-pointer focus:outline-none text-xl">
                                    <option>Percepatan</option>
                                    <option>Kecepatan</option>
                                    <option>Temperatur</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <line-chart></line-chart>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>