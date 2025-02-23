<script setup>
const links = [
    { name: 'Cameras', href: '/cameras', id: 1 },
    { name: 'Gate Report', href: '/gate', id: 2 },
    { name: 'Map', href: '/map', id: 3 },
    { name: 'Weather', href: '/weather', id: 4 },
];
</script>

<template>
    <div class="w-auto grid grid-cols-10 p-2 gap-2">
        <div class="flex flex-col gap-2 col-span-2">
            <div v-for="link in links" :key="link.id">
                <NuxtLink :to="link.href" class="border-2 rounded-md p-2 flex justify-center items-center">
                    {{ link.name }}
                </NuxtLink>
            </div>
        </div>
        
        <div class="gap-4 col-span-8">
            <slot />
        </div>
    </div>
</template>