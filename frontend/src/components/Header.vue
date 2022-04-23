<script setup>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import axios from "axios"

const route = useRoute();

const result = ref([]);
const search_input = ref("");
const showNotificationBox = ref(false);
const showResult = ref(false);

async function search(){
    if(route.path.includes("jenis_mesin")){
        if(search_input.value !== ""){
            await axios.post(`/api/jenis_mesin/search?search=${search_input.value}`).then((res)=>{
                console.log(res.data)
                result.value = res.data;
                if(result.value.length > 0){
                    showResult.value = true;
                }else{
                    showResult.value = false;
                }
            })
        }else{
            showResult.value = false;
            result.value = []
        }
    }
    else if(route.path.includes("monitoring")){
        if(search_input.value !== ""){
            await axios.post(`/api/mesin/search?search=${search_input.value}`).then((res)=>{
                console.log(res.data)
                result.value = res.data;
                if(result.value.length > 0){
                    showResult.value = true;
                }else{
                    showResult.value = false;
                }
            })
        }else{
            showResult.value = false;
            result.value = []
        }
    }
    else if(route.path.includes("user_setting")){
        if(search_input.value !== ""){
            await axios.post(`/api/user/search?search=${search_input.value}`).then((res)=>{
                console.log(res.data)
                result.value = res.data;
                if(result.value.length > 0){
                    showResult.value = true;
                }else{
                    showResult.value = false;
                }
            })
        }else{
            showResult.value = false;
            result.value = []
        }
    }
}
</script>

<template>
    <div>
        <header class="bg-light px-7 py-5 flex justify-between sticky top-0 z-50" style="box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);">
                <div class="relative">
                    <input type="text" placeholder="Search For..." class="border border-main_blue px-3 py-1.5 rounded-md w-80 text-xl focus:outline-none" v-if="($route.name !== 'Dashboard') && ($store.state.hak_akses !== 2 && $route.name !== 'UserSetting' )" v-model="search_input" @keyup="search()">
                    <div class="bg-light border rounded-md absolute z-50 w-80 max-h-56 overflow-y-auto" style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);" v-if="showResult && search_input !== '' && $route.path.includes('jenis_mesin')">
                        <div v-for="(res) in result" :key="res._id" class="py-3 px-3 text-lg hover:bg-main_blue hover:text-light hover:cursor-pointer" @click="$router.push({name: 'DetailJenisMesin', params:{_id: res._id}})">
                            {{res.jenis_mesin}} - {{res.kode_jenis_mesin}}
                        </div>
                    </div>
                    <div class="bg-light border rounded-md absolute z-50 w-80 max-h-56 overflow-y-auto" style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);" v-if="showResult && search_input !== '' && $route.path.includes('monitoring')">
                        <div v-for="(res) in result" :key="res._id" class="py-3 px-3 text-lg hover:bg-main_blue hover:text-light hover:cursor-pointer" @click="$router.push({name: 'DetailMonitoring', params:{_id: res._id}})">
                            {{res.nama_mesin}} - {{res.kode_mesin}}
                        </div>
                    </div>
                    <div class="bg-light border rounded-md absolute z-50 w-80 max-h-56 overflow-y-auto" style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);" v-if="showResult && search_input !== '' && $route.path.includes('user_setting')">
                        <div v-for="(res) in result" :key="res._id" class="py-3 px-3 text-lg hover:bg-main_blue hover:text-light hover:cursor-pointer">
                            {{res.nama}} - {{res.username}}
                        </div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="relative mr-8" @click="showNotificationBox = !showNotificationBox">
                        <img src="../assets/svg/Notification.svg" class="w-9 ml-3 inline hover:cursor-pointer">
                        <span class="bg-red-200 text-light font-medium absolute right-0 px-1 rounded -mt-1 text-sm hover:cursor-pointer">{{$store.state.mesin_anomali.length}}</span>
                        <div class="absolute bg-light border rounded-lg py-2 px-2 -ml-64     mt-2 w-80 h-52 max-h-52 overflow-y-auto" v-if="showNotificationBox" style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);">
                            <div class="text-main_blue">
                                <h1 class="text-center font-bold text-lg">Notification</h1>
                                <div class="mt-3">
                                    <p v-for="(anomali, i) in $store.state.mesin_anomali" :key="i" @click="$router.push({name:'DetailMonitoring', params:{_id: anomali._id}})" class="hover:cursor-pointer">
                                        <span>{{i+1}}. </span>
                                        <span class="text-main_blue text-base">{{anomali.sensor_ai.latest_data_ai[0].kondisi_kesehatan === 50 ? 'Anomaly occurred in the machine ' : 'A failure has occurred on the machine '}}{{anomali.kode_mesin}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="mr-5 text-2xl font-medium hover:cursor-pointer" @click="$router.push({name:'UserSetting'})">
                        {{$store.state.user_data.username}}
                    </span>
                    <div class="border w-9 h-9 rounded-full hover:cursor-pointer" @click="$router.push({name:'UserSetting'})">
                        <img src="../../src/assets/img/admin.png" class="w-10 p-1" v-if="$store.state.user_data.hak_akses === 1">
                        <img src="../../src/assets/img/user.png" class="w-10 p-1" v-else>
                    </div>
                </div>
            </header>
    </div>
</template>