<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import VueApexChart from "vue3-apexcharts";
const props = defineProps(["health","labels","indikasi"]);

const color = ref("");
const bg = ref("");
const health = ref(0)
console.log(props.health)
if(props.health === 100){
    color.value = "#61FF00";
    bg.value = "#dfefff"
    health.value = props.health
}else if(props.health === 50){
    color.value = "#FFF000";
    bg.value = "#dfefff"
    health.value = props.health
}else if(props.health === 0){
    color.value = "#FF0000"
    health.value = 20
    bg.value = "#dfefff"
}

var chartOptions = {
  chart: {
    type: "radialBar",
  },
  colors: [color.value],
  series: [health.value],
  labels: [props.labels],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: bg.value,
        startAngle: -90,
        endAngle: 90,
      },
      dataLabels: {
        name: {
          offsetY: 0,
          show: true,
          color: "#1a1d29",
          fontSize: "25px"
        },
        value: {
          fontSize: "30px",
          FontFace: "NotoSans",
          show: false,
        },
      },
    },
  },
  responsive: [{
    breakpoint: 1000,
    options: {},
  }]
};

onMounted(() => {});
</script>

<template>
  <div>
    <vue-apex-chart
      width="100%"
      height="400px"
      style="margin-top: -0px !important"
      type="radialBar"
      :options="chartOptions"
      :series="chartOptions.series"
    ></vue-apex-chart>
  </div>
</template>