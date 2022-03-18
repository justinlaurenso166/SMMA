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
        <div style="width: 500px">
            <SideBar />
        </div>
        <div class="w-full overflow-y-auto h-screen">
            <header class="bg-light px-7 py-5 flex justify-between sticky top-0" style="box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);">
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
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">Jenis Mesin / </h1>
                </div>

                <div>
                    <div class="flex justify-end">
                        <button class="text-light bg-main_blue text-2xl px-6 py-3 rounded-xl">Tambah +</button>
                    </div>
                    <div class="table bg-light b-shadow w-full px-8 py-6 mt-6 rounded-xl">
                        <table class="table-auto w-full border-collapse border border-slate-500">
                            <tr>
                                <th class="border border-slate-500">No</th>
                                <th class="border border-slate-500">Kode</th>
                                <th class="border border-slate-500">Nama</th>
                                <th class="border border-slate-500">Action</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>