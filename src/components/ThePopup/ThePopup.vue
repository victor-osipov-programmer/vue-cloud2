<template>
    <Teleport to="body">
        <Transition name="popup">
            <div v-if="popup.open" class="popup">
                {{ popup.text }}
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
    import { usePopupStore } from './popup.store.js'
    const popup = usePopupStore()
</script>

<style scoped>
.popup-enter-active {
    transition: all 0.5s ease-out;
}
.popup-leave-active {
    transition: all 0.5s ease-in;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.popup {
    position: fixed;
    top: 0;
    right: 0;
    background-color: coral;
    border-radius: 5px 0 0 5px;
    padding: 0.5rem 1rem;
    min-width: 200px;
}
</style>