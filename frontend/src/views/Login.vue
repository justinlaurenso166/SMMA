<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

//untuk menampun username dan password
const user_data = reactive({
  username: "",
  password: "",
});
//untuk menampung error message
const error_msg = ref("");

//function login
async function login() {
  try {
    await axios.post("/api/user/login", user_data).then((response) => {
      if (response.status === 200) {
        store.commit("MUTATE_USER_DATA", response.data);
        console.log(response.data)
        router.push("/dashboard");
      } else {
        error_msg.value = "Error Login";
      }
    });
  } catch (error) {
    console.log(error);
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
    <div class="w-1/3 bg-main_blue">
    <div class="logo_text flex flex-col items-center justify-center h-screen">
        <div class="logo">
          <img src="../assets/img/logo.png" class="w-72 m-auto">
          <h1 class="text-light text-4xl font-bold text-center">PT. YOKOGAWA</h1>
          <p class="text-light text-2xl text-center mt-3">Co-Innovating tomorrow</p>
        </div>
        <div class="text-light text-center mt-10">
            <!-- <h1 class="text-4xl">SMMA</h1> -->
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
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              v-model="user_data.username"
              class="mb-5 p-2 focus:outline-none border rounded-2xl border-main_blue text-xl"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              v-model="user_data.password"
              class="mb-5 p-2 focus:outline-none border rounded-2xl border-main_blue text-xl"
            />
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