<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import VueApexChart from "vue3-apexcharts"

const props = defineProps(["data_sensor"]);

console.log(props.data_sensor)
const data_percepatan = ref([]);
const data_kecepatan = ref([]);
const data_suhu = ref([]);
const x_label = ref([]);


for(let i = 0; i < 25; i++){
    x_label.value.push(i);
    data_percepatan.value.push(0);
    data_kecepatan.value.push(0);
    data_suhu.value.push(0);
}

props.data_sensor.forEach((e)=>{
  var idx = x_label.value.indexOf(new Date(e.timestamps).getHours());

  if(~idx){
    data_percepatan.value[idx] = e.percepatan
    data_kecepatan.value[idx] = e.kecepatan
    data_suhu.value[idx] = e.suhu
  }
})

const chartOptions = {
  chart: {
    id: "line",
    type: "area",
    stacked: false,
  },
  xaxis: {
    categories: x_label.value,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    colors: ["#004f9b","#3751FF","#fb7448"],
    width: 2,
  },
  fill:{
      colors:["#FFFFFF"]
  }
};

const series = [
  {
    type: "area",
    name: "Percepatan",
    data: data_percepatan.value,
  },
  {
    type: "area",
    name: "Kecepatan",
    data: data_kecepatan.value,
  },
  {
    type: "area",
    name: "Suhu",
    data: data_suhu.value,
  },
];

onMounted(()=>{
    data_percepatan.value = [];
    data_kecepatan.value = [];
    data_suhu.value = [];
    x_label.value = [];
})
</script>

<template>
    <div>
         <vue-apex-chart width="100%" height="350" type="area" :options="chartOptions" :series="series"></vue-apex-chart>
    </div>
</template>