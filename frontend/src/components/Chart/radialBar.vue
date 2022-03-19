<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import VueApexChart from "vue3-apexcharts";
const props = defineProps(['health']);

const color = ref("");
if(props.health >= 70){
    color.value = "#61FF00";
}else if(props.health < 70 && props.health >= 50){
    color.value = "#FFF000";
}else if(props.health < 50){
    color.value = "#FF0000"
}

var chartOptions = {
  chart: {
    height: 350,
    type: "radialBar",
  },
  colors: [color.value],
  series: [props.health],
  labels: ["HEALTHY"],
  plotOptions: {
    radialBar: {
      dataLabels: {
        showOn: "always",
        name: {
          offsetY: -20,
          show: true,
          color: "#1a1d29",
          fontSize: "15px",
          fontFamily: 'Noto Sans',
        },
        value: {
          color: "#111",
          fontSize: "45px",
          fontWeight: "700",
          fontFamily: 'Noto Sans',
          show: true,
        },
      },
    },
  },
};

onMounted(() => {});
</script>

<template>
  <div>
    <vue-apex-chart
      width="100%"
      height="350"
      type="radialBar"
      :options="chartOptions"
      :series="chartOptions.series"
    ></vue-apex-chart>
  </div>
</template>