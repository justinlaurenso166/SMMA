<script setup>
import SideBar from "../../components/SideBar.vue"

</script>

<style scoped>
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
            <header class="bg-light px-7 py-5 flex justify-between sticky top-0 z-50" style="box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);">
                <div>
                    <input type="text" placeholder="Search For..." class="border border-main_blue px-3 py-1.5 rounded-md w-80 text-xl focus:outline-none">
                </div>
                <div class="flex items-center">
                    <span class="capitalize mr-5 text-2xl font-medium">
                        {{$store.state.user_data.username}}
                    </span>
                    <div class="border w-9 h-9 rounded-full"></div>
                </div>
            </header>
            <section class="p-10 flex flex-col gap-9">
                <div class="heading">
                    <h1 class="font-bold text-gray-200 text-4xl">Jenis Mesin</h1>
                    <h1 class="font-medium text-gray-200 text-2xl mt-1.5">
                        <span class="cursor-pointer" @click="$router.push({name:'JenisMesin'})">Jenis Mesin</span> / <span class="cursor-pointer" @click="$router.push({name:'EditJenisMesin'})">Tambah Jenis Mesin</span>
                    </h1>
                </div>

                <div>
                    <div class="flex gap-7">
                        <div class="w-1/3 bg-light b-shadow py-7 px-8 rounded-xl">
                            <h3 class="text-center font-bold text-lg">Informasi Umum</h3>
                            <div class="info mt-3">
                                <div class="kode text-lg">
                                    <h3 class="font-bold">Kode</h3>
                                    <p class="">MSN-007</p>
                                </div>
                                <div class="nama text-lg mt-2">
                                    <h3 class="font-bold">Nama</h3>
                                    <input type="text" class="w-full px-4 py-1 border-2 focus:outline-none rounded-xl border-main_blue bg-gray-100 mt-1" placeholder="Nama Jenis Mesin...">
                                </div>
                                <div class="desc text-lg mt-2">
                                    <h3 class="font-bold">Deskripsi</h3>
                                    <textarea class="w-full px-4 py-1 border-2 focus:outline-none rounded-xl border-main_blue bg-gray-100 mt-1" rows="10" placeholder="Deskripsi..."></textarea>
                                </div>

                                <div class="save_changes w-52 m-auto mt-5">
                                    <button class="bg-main_blue text-light text-lg px-3 p-3 w-full rounded-xl">Save</button>
                                </div>
                            </div>
                        </div>
                        <div class="w-2/3 bg-light b-shadow rounded-xl py-7 px-8 self-start">
                            <h3 class="text-center font-bold text-lg">Daftar Kerusakan</h3>
                            <div class="form mt-7">
                                <div class="add_kerusakan">
                                    <div class="flex gap-7">
                                        <input type="text" placeholder="Tambah Kerusakan..." class="border border-main_blue rounded-xl px-4 py-1.5 w-full focus:outline-none">
                                    <div class="text-4xl bg-main_blue text-light px-4 py-1 rounded-md"> + </div>
                                    </div>
                                </div>
                                <div class="list mt-5 text-lg">
                                    <h3 class="font-bold">Kerusakan Mesin</h3>
                                    <p>
                                        <span>1. </span>
                                        <span></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>