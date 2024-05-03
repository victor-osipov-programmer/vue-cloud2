<template>
    <Suspense>
        <RouterView />
    </Suspense>
    
    <ThePopup />
</template>

<script setup>
import { ThePopup } from '@/components/ThePopup'
</script>
