<script setup>
import SideBar from "../../components/SideBar.vue"
import axios from "axios"
import { reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import ObjectId from "bson-objectid";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { useRoute, useRouter } from "vue-router";
import modal from "../../components/ModalConfirm.vue"
import Header from "../../components/Header.vue"

const route = useRoute();
const router = useRouter();

//-----------REACTIVE STATE-------------------
const jenis_mesin = reactive({
    kode_jenis_mesin: "",
    jenis_mesin: "",
    spesifikasi: "",
    kerusakan: [],
})
const new_kerusakan = ref("");
const daftar_mesin = ref([]);
const showDeleteKerusakanBox = ref(false)
const showDeleteMesinBox = ref(false);
const kerusakan_id = ref("");
const remove_mesin_id = ref("");

const id = route.params._id;

async function getJenisMesinById(){
    try {
        await axios.get(`/api/jenis_mesin/${id}`).then((response)=>{
            jenis_mesin.kode_jenis_mesin = response.data.kode_jenis_mesin;
            jenis_mesin.jenis_mesin = response.data.jenis_mesin;
            jenis_mesin.spesifikasi = response.data.spesifikasi;
            jenis_mesin.kerusakan = response.data.kerusakan;
        })
    } catch (error) {
        console.log(error)
    }
}

async function editJenisMesin(){
    try {
        await axios.put(`/api/jenis_mesin/edit/${id}`,jenis_mesin).then((response)=>{
            if(response.status === 200){
                createToast(response.data,{
                    type: "success",
                    showCloseButton: true,
                    timeout: 3000,
                    showIcon: true,
                    transition: "zoom",
                });
                getJenisMesinById();
                setTimeout(()=>{
                    router.push({name: "DetailJenisMesin"})
                },3000)
            }
        })
    } catch (error) {
        console.log(error)
    }
}


function addKerusakan(){
    if(new_kerusakan.value !== ''){
        let new_data = {
            _id: new ObjectId().toString(),
            nama: new_kerusakan.value,
        }
        jenis_mesin.kerusakan.push(new_data);
        new_kerusakan.value = "";
        console.log(jenis_mesin.kerusakan)
    }
    else{
        new_kerusakan.value = "";
    }
}

function removeKerusakan(){
    jenis_mesin.kerusakan = jenis_mesin.kerusakan.filter((item)=>item._id !== kerusakan_id.value)
    showDeleteKerusakanBox.value = false;
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

async function removeMesin(){
    console.log(remove_mesin_id)
    let data = daftar_mesin.value.filter((item)=>item._id === remove_mesin_id.value);
    if(data[0]){
        data[0].id_jenis_mesin = null;
        data[0].jenis_mesin = "";
    }
    try {
        axios.put('/api/mesin/remove/'+remove_mesin_id.value, data[0]).then((res)=>{
            if(res.status === 200){
                console.log(res.data)
                daftar_mesin.value = daftar_mesin.value.filter((item)=>item._id !== remove_mesin_id.value)
                showDeleteMesinBox.value = false;
            }
        })
    } catch (error) {
        console.log(error)
    }

}

onMounted(async()=>{
    await getJenisMesinById();
    await getDaftarMesin();
    // console.log(jenis_mesin)
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
                    <h1 class="font-bold text-gray-200 text-4xl">Machine Types</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                        <span class="cursor-pointer" @click="$router.push({name:'JenisMesin'})">Machine Types</span> / <span class="cursor-pointer" @click="$router.push({name:'EditJenisMesin'})">Edit Machine Type</span>
                    </h1>
                </div>

                <div>
                    <form @submit.prevent="editJenisMesin()">
                        <div class="flex justify-end" v-if="$store.state.user_data.hak_akses === 1">
                            <button type="submit" class="bg-main_blue text-light text-lg px-3 p-3 w-1/5 rounded-xl" >Save Changes</button>
                        </div>
                        <div class="flex gap-7 mt-6">
                            <div class="w-1/3 ">
                            <div class="bg-light b-shadow py-7 px-8 rounded-xl">
                                <h3 class="text-center font-bold text-lg">General Information</h3>
                                <div class="info mt-3">
                                        <div class="kode text-lg">
                                            <h3 class="font-bold">Code</h3>
                                            <input type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1 hover:cursor-not-allowed" v-model="jenis_mesin.kode_jenis_mesin" disabled>
                                        </div>
                                        <div class="nama text-lg mt-2">
                                            <h3 class="font-bold">Name</h3>
                                            <input required type="text"  class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1" v-model="jenis_mesin.jenis_mesin">
                                        </div>
                                        <div class="desc text-lg mt-2">
                                            <h3 class="font-bold">Description</h3>
                                            <textarea class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1" rows="10" v-model="jenis_mesin.spesifikasi"></textarea>
                                        </div>
                                </div>
                            </div>
                            </div>
                            <div class="w-2/3 ">
                                <div class="bg-light b-shadow rounded-xl py-7 px-8 self-start">
                                    <h3 class="text-center font-bold text-lg">Damage List</h3>
                                    <div class="form mt-7">
                                        <div class="add_kerusakan">
                                            <div class="flex gap-7">
                                                <input type="text" placeholder="Add Damage..." class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-1" v-model="new_kerusakan">
                                            <div class="text-4xl bg-main_blue text-light px-4 py-1 rounded-md" @click="addKerusakan"> + </div>
                                            </div>
                                        </div>
                                        <div class="list mt-5 text-lg">
                                            <h3 class="font-bold">Machine Damage</h3>
                                            <p v-for="(kerusakan, idx) in jenis_mesin.kerusakan" :key="kerusakan._id" class="mt-2">
                                                <span class="border mr-3 hover:cursor-pointer" @click="kerusakan_id = kerusakan._id; showDeleteKerusakanBox = true;">
                                                    <img src="../../assets/svg/Cross.svg" class="inline -mt-1">
                                                </span>
                                                <span>{{idx+1}}. </span>
                                                <span>{{kerusakan.nama}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-light b-shadow w-full px-8 py-6 mt-8 rounded-xl">
                                    <div class="list_mesin">
                                        <h3 class="text-center font-bold text-lg mb-4">Monitoring Machine List</h3>
                                        <p v-for="(daftar, idx) in daftar_mesin" :key="daftar._id" class="mt-2">
                                            <span class="border mr-3 hover:cursor-pointer" @click="remove_mesin_id = daftar._id; showDeleteMesinBox = true">
                                                <img src="../../assets/svg/Cross.svg" class="inline -mt-1">
                                            </span>
                                            <span>{{idx+1}}. </span>
                                            <span>{{daftar.nama_mesin}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <modal v-if="showDeleteKerusakanBox">
                    <template v-slot:header>
                        <h1 class="text-center text-2xl font-bold text-main_blue">Delete Confirmation</h1>
                    </template>
                    <template v-slot:body>
                        <div class="mt-8">
                            <h3 class="text-xl text-center font-semibold">Are you sure you want to delete this Machine Damage?</h3>
                            <p class="text-center text-lg font-medium mt-2">Data will be deleted forever</p>
                            <div class="flex gap-12 mt-10">
                                <button class="flex-1 bg-red-200 text-light text-lg text-semibold py-2.5 rounded-lg" @click="showDeleteKerusakanBox = false">Cancel</button>
                                <button class="flex-1 bg-main_blue text-light text-lg text-semibold py-2.5 rounded-lg" @click="removeKerusakan()">Yes, delete this data</button>
                            </div>
                        </div>
                    </template>
                </modal>
                <modal v-if="showDeleteMesinBox">
                    <template v-slot:header>
                        <h1 class="text-center text-2xl font-bold text-main_blue">Delete Confirmation</h1>
                    </template>
                    <template v-slot:body>
                        <div class="mt-8">
                            <h3 class="text-xl text-center font-semibold">Are you sure you want to remove machine monitoring from this machine type?</h3>
                            <p class="text-center text-lg font-medium mt-2">Data will be deleted forever</p>
                            <div class="flex gap-12 mt-10">
                                <button class="flex-1 bg-red-200 text-light text-lg text-semibold py-2.5 rounded-lg" @click="showDeleteMesinBox = false">Cancel</button>
                                <button class="flex-1 bg-main_blue text-light text-lg text-semibold py-2.5 rounded-lg" @click="removeMesin()">Yes, delete this data</button>
                            </div>
                        </div>
                    </template>
                </modal>
            </section>
        </div>
    </div>
</template>