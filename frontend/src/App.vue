<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import axios from "axios"
import store from "../src/store"

const mesin_anomali = ref([]);

//check if machine have anomaly or not
async function checkMesinAnomali(){
  try {
      await axios.get("/api/mesin/all").then((response) => {
        mesin_anomali.value = response.data.filter(
          (item) => item.sensor_ai.latest_data_ai[0].kondisi_kesehatan <= 50
        );
        if(mesin_anomali.value.length > 0){
          store.commit("MUTATE_MESIN_ANOMALI", mesin_anomali.value);
          console.log("Terjadi Anomali pada mesin")
        }
      });
    } catch (error) {
      console.log(error);
    }
}

setInterval(async () => {
  if(store.state.user_data !== null){
    await checkMesinAnomali();
  }
}, 5000);

watch(()=>store.state.user_data,async function(){
  if(store.state.user_data !== null){
    await checkMesinAnomali();
    }
})

onMounted(async()=>{
  if(store.state.user_data !== null){
    await checkMesinAnomali();
    }
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: "Noto Sans", sans-serif;
}
</style>
