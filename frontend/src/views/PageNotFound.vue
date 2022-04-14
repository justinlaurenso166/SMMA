<script setup>

</script>

<template>
    <div class="flex justify-center h-screen w-screen bg-gray-100">
        <div class="items-center flex">
            <div class="flex flex-col gap-6">
                <div class="w-96">
                    <img src="../assets/svg/NotFound.svg">
                </div>
                <div class="text-center">
                    <h1 class="font-bold text-4xl tracking-wide mt-3">404</h1>
                    <p class="tracking-wide font-medium text-2xl mt-4">
                        Page Not Found
                    </p>    
                </div>
                <div class="text-center mt-5">
                    <span class="italic hover:cursor-pointer font-medium text-lg hover:text-main_blue hover:underline" @click="$router.push({name: 'Dashboard'})">Back to Dashboard</span>
                </div>
            </div>
        </div>
    </div>
</template>