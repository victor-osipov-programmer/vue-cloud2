<template>
    <div class="app-file">
        <div class="text">
            <div v-if="id" class="id">{{ id }}</div>
            <div class="name">{{ name }}</div>
        </div>
        
        <div class="buttons">
            <slot>

            </slot>
            
        </div>
    </div>
</template>

<script setup>
defineProps(['id', 'name'])
// const emit = defineEmits(['remove_file', 'edit_file', 'right_file', 'download_file'])
</script>

<style lang="scss" scoped>
.app-file {
    display: flex;
    background-color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.text {
    display: flex;
    // gap: 1rem;
}
.name {
    font-size: 1.5rem;
}
.id {
    min-width: 150px;
    // padding-right: 3rem;
}
.buttons {
    display: flex;
    gap: 0.5rem;
}
</style>