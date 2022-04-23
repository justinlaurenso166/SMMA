<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import unlock from "../assets/svg/Eye_closed.svg"
import lock from "../assets/svg/Eye.svg"

const route = useRoute();
const router = useRouter();
const store = useStore();

//untuk menampun username dan password
const user_data = reactive({
  username: "",
  password: "",
});
//untuk menampung error message
const alert = reactive({
  show: false,
  error_msg: ""
})
const showPassword = ref(false)

//function login
async function login() {
  try {
    await axios.post("/api/user/login", user_data).then((response) => {
      if (response.status === 200) {
        store.commit("MUTATE_USER_DATA", response.data);
        // console.log(response.data)
        router.push("/dashboard");
      }
    })
  } catch (error) {
    if(error.response){
      alert.show = true;
      alert.error_msg = error.response.data;
      setTimeout(()=>{
        alert.show= false;
      }, 3000)
      console.log(error_msg.value);
    }
  }
}
</script>

<style scoped>
.sign_in{
  box-shadow: 10px 8px 5px rgba(0, 79, 155, 0.25);
}
</style>

<template>
  <div class="flex h-screen bg-gray-400">
    <div class=" bg-main_blue rounded-tr-3xl rounded-br-3xl" style="width: 500px">
      <div class="logo_text flex flex-col items-center justify-center h-screen relative">
          <div class="logo -mt-24">
            <h1 class="text-light font-extrabold tracking-wider" style="font-size: 60px;">
              Smart <br> Monitoring <br> Machine <br> <span class="font-extralight">with</span> <br> AI
            </h1>
          </div>
          <div class="text-light flex mt-10 absolute bottom-0 mb-10">
              <div class="flex-1 p-5 flex flex-col justify-center">
                <div>
                    <h3 class="float-left text-xl font-bold">YOKOGAWA</h3>
                    <img src="../assets/img/logo.png" class="inline w-11 -mt-2.5">
                </div>
                  <p class="text-sm">Co - Innovating Tomorrow</p>
              </div>
              <div class="flex-1 p-5">
                  <img src="../assets/img/pradita.png">
              </div>
          </div>
      </div>
    </div>
    <div class="w-1/2 m-auto">
      <div
        class="
          flex
          align-middle
          justify-center
          items-center
          content-center
        "
      >
        <div class="sign_in bg-gray-400 py-8 px-10 border-2 rounded-3xl border-main_blue shadow-main_blue w-2/3">
          <form method="POST" @submit.prevent="login()" class="flex flex-col">
            <h1 class="text-center mb-5 text-main_blue font-semibold" style="font-size: 48px;">Sign In</h1>
            <div class="flex mb-5">
              <div class="flex-0">
                <img src="../assets/svg/User.svg" class="w-11 mr-3">
              </div>
              <div class="flex-1">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  v-model="user_data.username"
                  class="p-2 focus:outline-none border rounded-2xl border-main_blue text-xl w-full text-main_blue"
                  required
                />
              </div>
            </div>
            <div class="flex">
              <div class="flex-0">
                <img src="../assets/svg/Lock.svg" class="w-11 mr-3">
              </div>
              <div class="flex-1">
                <input
                  :type="!showPassword ? 'password' : 'text'"
                  id="password"
                  name="password"
                  placeholder="********"
                  v-model="user_data.password"
                  class="mb-5 p-2 focus:outline-none border rounded-2xl border-main_blue text-xl w-full text-main_blue"
                  required
                />
                <img :src="showPassword ? unlock : lock" class="cursor-pointer inline absolute w-10 -ml-12 mt-1" @click="showPassword = !showPassword">
              </div>
            </div>
            <div v-if="alert.show" class="text-red-200 font-bold text-center">
              {{alert.error_msg}}
            </div>
            <div class="w-52 m-auto mt-4">
              <button
                type="submit"
                class="bg-main_blue text-light text-3xl p-2 rounded-md focus:outline-none w-full" 
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>