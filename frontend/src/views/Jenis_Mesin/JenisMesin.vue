<script setup>
import SideBar from "../../components/SideBar.vue"
import axios from "axios"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import modal from "../../components/ModalConfirm.vue"

//------------REACTIVE STATE-------------
const all_jenis_mesin = ref([]);
const showDeleteBox = ref(false);
const remove_id = ref("");

async function getJenisMesin(){
    await axios.get('/api/jenis_mesin/all').then((response)=>{
        console.log(response.data)
        all_jenis_mesin.value = response.data
    })
}

async function deleteJenisMesin(){
    showDeleteBox.value = false;
    await axios.delete(`/api/jenis_mesin/delete/${remove_id.value}`).then((response)=>{
        // console.log(response.data)
        if(response.status === 200){
            createToast(response.data,{
                type: "success",
                showCloseButton: true,
                timeout: 3000,
                showIcon: true,
                transition: "zoom",
            });
            getJenisMesin();
        }
    })
}

//mount first time
onMounted(async()=>{
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
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">Jenis Mesin / </h1>
                </div>

                <div>
                    <div class="flex justify-end" v-if="$store.state.user_data.hak_akses === 1">
                        <button class="text-light bg-main_blue text-xl px-6 py-3 rounded-xl" @click="$router.push({name:'TambahJenisMesin'})">Tambah +</button>
                    </div>
                    <div class="table bg-light b-shadow w-full px-8 py-6 mt-6 rounded-xl">
                        <table class="table-auto w-full border-collapse border border-main_blue">
                            <tr class="text-xl">
                                <th class="border border-main_blue">No.</th>
                                <th class="border border-main_blue">Kode</th>
                                <th class="border border-main_blue">Nama</th>
                                <th class="border border-main_blue" v-if="$store.state.user_data.hak_akses === 1">Action</th>
                            </tr>
                            <tr v-for="(jenis, i) in all_jenis_mesin" :key="jenis._id">
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center p-2 text-lg font-medium border-l">{{(i+1)}}.</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l">
                                    <span class="cursor-pointer" @click="$router.push({name: 'DetailJenisMesin',params:{_id: jenis._id}})">{{jenis.kode_jenis_mesin}}</span>
                                </td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="px-4 py-3 text-lg font-medium border-l">{{jenis.jenis_mesin}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center px-4 py-3 text-lg font-medium border-l" v-if="$store.state.user_data.hak_akses === 1">
                                    <div class="bg-red-200 w-9 h-9 m-auto hover:cursor-pointer rounded-md" @click="showDeleteBox = true; remove_id = jenis._id"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <modal v-if="showDeleteBox">
                    <template v-slot:body>
                        <div>
                            <h3 class="text-2xl text-center font-bold">Apakah Anda yakin ingin menghapus jenis mesin ini ?</h3>
                            <p class="text-center text-xl font-medium mt-5">Data akan terhapus selamanya</p>
                            <div class="flex gap-12 mt-10">
                                <button class="flex-1 bg-red-200 text-light text-lg text-semibold py-2.5 rounded-lg" @click="showDeleteBox = false">Batal</button>
                                <button class="flex-1 bg-main_blue text-light text-lg text-semibold py-2.5 rounded-lg" @click="deleteJenisMesin()">Ya, hapus data ini</button>
                            </div>
                        </div>
                    </template>
                </modal>
            </section>
        </div>
    </div>
</template>