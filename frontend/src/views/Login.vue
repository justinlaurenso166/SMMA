<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const user_data = reactive({
  username: "",
  password: "",
});
const error_msg = ref("");

async function login() {
  try {
    await axios.post("/api/user/login", user_data).then((response) => {
      if (response.status === 200) {
        store.commit("MUTATE_USER_DATA", response.data);
        console.log(response.data)
        router.push("/");
      } else {
        error_msg.value = "Error Login";
      }
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-400">
    <div class="w-1/3 bg-main_blue">
    <div class="logo_text flex flex-col items-center justify-center h-screen">
        <div class="logo bg-light w-56 rounded-full">
          <img src="../assets/img/smma-logo.png">
        </div>
        <div class="text-light text-center mt-10">
            <h1 class="text-4xl">SMMA</h1>
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
        <div class="bg-gray-400 p-10 border-2 w-2/3">
          <form method="POST" @submit.prevent="login()" class="flex flex-col">
            <h1 class="text-3xl text-center mb-5">Login</h1>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              v-model="user_data.username"
              class="mb-5 p-2 focus:outline-none border-2"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              v-model="user_data.password"
              class="mb-5 p-2 focus:outline-none border-2"
            />
            <button
              type="submit"
              class="bg-main_orange text-light p-2 rounded-full focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>