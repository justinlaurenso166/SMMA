<script setup>
import { reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core";
import SideBar from "../components/SideBar.vue"
import store from "../store"
import axios from "axios"
import { useRoute } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import modal from "../components/ModalConfirm.vue"
import unlock from "../assets/svg/Eye_closed_Gray.svg"
import lock from "../assets/svg/Eye_Gray.svg"
import Header from "../components/Header.vue"

const user_id = store.state.user_data._id;
const data_user = reactive({
    nama: "",
    username: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    type: "",
})
const list_user = ref([]);
const update = ref(false);
const addNewUser = ref(false);
const new_user = reactive({
    nama: "",
    username: "",
    password: "",
})
const remove_id = ref("");
const showDeleteBox = ref(false);
const showPassword = ref(false)

const getListUser = async()=>{
    try {
        await axios.get('/api/user/all').then((res)=>{
            list_user.value = res.data.filter((item)=>item.hak_akses !== 1);
        })
    } catch (error) {
        
    }
}

const getUserByid = async()=>{
    try{
        await axios.get(`/api/user/get/${user_id}`).then((res)=>{
            console.log(res.data)
            data_user.nama = res.data.nama
            data_user.username = res.data.username
            data_user.current_password = res.data.password
    
            if(update.value === true){
                store.commit("MUTATE_USER_DATA", [res.data])
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const editProfile = async(type)=>{
    if(type === "username"){
        data_user.type = type;
        try {
            await axios.put('/api/user/edit/'+user_id, data_user).then((res)=>{
                if(res.status === 200){
                    update.value = true;
                    createToast(res.data,{
                        type: "success",
                        showCloseButton: true,
                        timeout: 3000,
                        showIcon: true,
                        transition: "zoom",
                    });
                    getUserByid();
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    else{
        //check the current password if not same then error
        if(data_user.current_password !== store.state.user_data.password){
            createToast("The old password doesn't match",{
                toastBackgroundColor: "red",
                showCloseButton: true,
                timeout: 3000,
                transition: "zoom",
            });
        } else{
            //check new password and confirm password
            if(data_user.new_password !== data_user.confirm_password){
                // console.log("aadf")
                createToast("New password and confirmation must be the same",{
                    toastBackgroundColor: "red",
                    showCloseButton: true,
                    timeout: 3000,
                    transition: "zoom",
                });
            }else{
                data_user.type = type;
                try {
                    await axios.put('/api/user/edit/'+user_id, data_user).then((res)=>{
                        if(res.status === 200){
                            update.value = true;
                            createToast(res.data,{
                                type: "success",
                                showCloseButton: true,
                                timeout: 3000,
                                showIcon: true,
                                transition: "zoom",
                            });
                            data_user.new_password = ""
                            data_user.confirm_password = ""
                            getUserByid();
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}

const addUser = async()=>{
    await axios.post('/api/user/adduser', new_user).then((res)=>{
        console.log(res.data)
        if(res.status === 200){
            createToast(res.data,{
                type: "success",
                showCloseButton: true,
                timeout: 3000,
                showIcon: true,
                transition: "zoom",
            });
            addNewUser.value = false;
            new_user.nama = ""
            new_user.username = ""
            new_user.password = ""
            getListUser();
        }
    })
}

const deleteUser = async()=>{
    await axios.delete(`/api/user/delete/${remove_id.value}`).then((res)=>{
        if(res.status === 200){
            createToast(res.data,{
                type: "success",
                showCloseButton: true,
                timeout: 3000,
                showIcon: true,
                transition: "zoom",
            });
            showDeleteBox.value = false
            getListUser();
        }
    })
}

const convertPassword = (pass)=>{
    let pass_length = pass.length;
    let number = 0;
    let converted = "";

    while(number !== pass_length){
        converted += "*";
        number++;
    }

    return converted;
}

onMounted(async()=>{
    update.value = false;
    await getListUser();
    await getUserByid();
})
</script>

<style scoped>
    .bar{
        background: linear-gradient(90deg, #FF0000 -7.14%, #FFF000 88.18%);
    }
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
            <Header />
            <section class="p-10 flex flex-col gap-9">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">User Setting</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">User Setting / </h1>
                </div>
                <div class="setting b-shadow px-7 py-7 rounded-xl bg-light">
                    <h1 class="text-2xl font-semibold text-gray-200">Account Setting</h1>
                    <h3 class="text-xl text-gray-200 mt-2">Setup account edit profile details, username, and password</h3>
                    <div class="change-username mt-6">
                        <form @submit.prevent="editProfile('username')"> 
                            <div class="flex gap-4">
                                <div class="flex-0 w-1/3 h-full">
                                    <h3 class="text-gray-200 font-semibold">NAME</h3>
                                    <div class="mt-8">
                                        <input type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3" v-model="data_user.nama">
                                    </div>
                                </div>
                                <div class="flex-1 w-1/2">
                                    <h3 class="text-gray-200 font-semibold">USERNAME</h3>
                                    <p class="text-gray-200 mt-2 text-sm">*username is expected to be unique</p>
                                    <div class="mt-1">
                                        <input type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3" v-model="data_user.username">
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div>
                                        <button class="bg-main_blue text-light text-xl mt-14 py-2.5 rounded-xl px-3 w-1/2">Change</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="change-password mt-6">
                        <form @submit.prevent="editProfile('password')"> 
                            <h3 class="text-gray-200 font-semibold float-left">CURRENT PASSWORD</h3>
                            <img :src="!showPassword ? lock : unlock " class="inline  ml-4 -mt-1.5 cursor-pointer w-8" @click="showPassword = !showPassword">
                            <div class="flex gap-4 mt-4">
                                <div class="flex-1">
                                    <div>
                                        <input :type="!showPassword ? 'password' : 'text'" class="w-full bg-gray-50 focus:outline-none py-3 px-3" v-model="data_user.current_password">
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div>
                                        <input :type="!showPassword ? 'password' : 'text'" class="w-full bg-gray-50 focus:outline-none py-3 px-3" v-model="data_user.new_password" placeholder="New Password">
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div>
                                        <input :type="!showPassword ? 'password' : 'text'" class="w-full bg-gray-50 focus:outline-none py-3 px-3" placeholder="Confirm Password" v-model="data_user.confirm_password">
                                    </div>
                                </div>
                                <div class="flex-0">
                                    <div>
                                        <button class="bg-main_blue text-light text-xl py-2.5 rounded-xl px-5 w-full" :class="data_user.new_password === '' && data_user.confirm_password === '' ? 'cursor-not-allowed' : 'cursor-pointer'" :disabled="data_user.new_password === '' && data_user.confirm_password === ''">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="setting b-shadow px-7 py-7 rounded-xl bg-light" v-if="$store.state.user_data.hak_akses === 1">
                    <h1 class="text-2xl font-semibold text-gray-200">List Users</h1>
                    <div class="flex justify-end" v-if="$store.state.user_data.hak_akses === 1">
                        <button class="text-light bg-main_blue text-lg px-6 py-2.5 rounded-xl" @click="addNewUser = true">Add New user</button>
                    </div>
                    <div class="mt-8">
                        <table class="table-auto w-full border-collapse border border-main_blue">
                            <tr class="text-lg text-gray-200 uppercase">    
                                <th class="border border-main_blue py-1.5">Name</th>
                                <th class="border border-main_blue py-1.5">Username</th>
                                <th class="border border-main_blue py-1.5">Password</th>
                                <th class="border border-main_blue py-1.5" v-if="$store.state.user_data.hak_akses === 1">Action</th>
                            </tr>
                            <tr v-for="(user, i) in list_user" :key="user._id">
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center p-2 text-lg font-medium border-l">{{(user.nama)}}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center px-4 py-3 text-lg font-medium border-l">
                                    <span class="cursor-pointer">{{user.username}}</span>
                                </td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center px-4 py-3 text-lg font-medium border-l">{{ convertPassword(user.password) }}</td>
                                <td :class="(i+1)%2==1 ? 'bg-blue-100' : 'bg-light'" class="text-center px-4 py-3 text-lg font-medium border-l" v-if="$store.state.user_data.hak_akses === 1">
                                    <div class="bg-red-200 w-9 h-9 m-auto hover:cursor-pointer rounded-md" @click="showDeleteBox = true; remove_id = user._id">
                                            <img src="../assets/svg/Trash.svg" class="w-7 m-auto pt-1">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
            <modal v-if="addNewUser">
                <template v-slot:header>
                    <h1 class="text-left text-3xl font-semibold tracking-wider mb-7">ADD USER</h1>
                </template>
                <template v-slot:body>
                    <form @submit.prevent="addUser">
                        <div>
                            <h3 class="tracking-wide">NAME</h3>
                            <input type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-3" placeholder="INSERT NAME" v-model="new_user.nama">
                        </div>
                        <div class="mt-5">
                            <h3 class="tracking-wide">USERNAME</h3>
                            <input type="text" class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-3" placeholder="INSERT USERNAME" v-model="new_user.username">
                        </div>
                        <div class="mt-5">
                            <h3 class="tracking-wide">PASSWORD</h3>
                            <input type="password" class="w-full bg-gray-50 focus:outline-none py-3 px-3 mt-3" placeholder="*********" v-model="new_user.password">
                        </div>
                        <div class="flex gap-8 w-72 m-auto mt-10">
                            <div class="flex-1">
                                <button class="bg-red-200 w-full text-light font-semibold text-lg rounded-lg py-2" @click="addNewUser = false">Cancel</button>
                            </div>
                            <div class="flex-1">
                                <button class="bg-main_blue w-full text-light font-semibold text-lg rounded-lg py-2">Save</button>
                            </div>
                        </div>
                    </form>
                </template>
            </modal>
            <modal v-if="showDeleteBox">
                    <template v-slot:body>
                        <div>
                            <h3 class="text-2xl text-center font-bold">Are you sure you want to delete this user?</h3>
                            <p class="text-center text-xl font-medium mt-5">Data will be deleted forever</p>
                            <div class="flex gap-12 mt-10">
                                <button class="flex-1 bg-red-200 text-light text-lg text-semibold py-2.5 rounded-lg" @click="showDeleteBox = false">Cancel</button>
                                <button class="flex-1 bg-main_blue text-light text-lg text-semibold py-2.5 rounded-lg" @click="deleteUser()">Yes, delete</button>
                            </div>
                        </div>
                    </template>
                </modal>
        </div>
    </div>
</template>