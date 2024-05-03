<template>
    <div class="app-file">
        <div class="text">
            <div class="email">{{ email }}</div>
            <div class="name">{{ fullname }}</div>
        </div>
        
        <div class="buttons">
            <slot>

            </slot>
            
        </div>
    </div>
</template>

<script setup>
defineProps(['fullname', 'email'])
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
}
.name {
    font-size: 1.5rem;
}

.email {
    min-width: 150px;
}
.buttons {
    display: flex;
    gap: 0.5rem;
    max-height: 40px;
}
</style>