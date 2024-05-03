<template>
    <div class="upload-files-page">
        <input ref="file_el" type="file" multiple>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const file_el = ref(null)
</script>

<style lang="scss" scoped>

</style>