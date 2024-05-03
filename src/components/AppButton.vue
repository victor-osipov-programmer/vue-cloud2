<template>
    <button class="app-button" type="button">
        <slot></slot>
    </button>
</template>

<script setup>

</script>

<style scoped>
.app-button {
    background-color: var(--primary-color);
    border: none;
    border-radius: 5px;
    min-height: 40px;
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    cursor: pointer;
    text-transform: uppercase;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
}
</style>