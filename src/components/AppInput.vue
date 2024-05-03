<template>
    <div class="app-input">
        <input 
            class="input" 
            :class="{ red: error }"
            v-bind="$attrs"
            v-model="text"
        >
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { defineModel, toValue, watch, defineOptions } from 'vue';
defineOptions({
    inheritAttrs: false
})
const text = defineModel('text');
const error = defineModel('error');
const validator = defineModel('validator', {
    default: true
});

const props = defineProps(['required', 'email']);

function validate(type, condition, message) {
    if (props[type] !== undefined) {

        watch([text, error, () => props.validator], () => {
            if (!props.validator) return validator.value = true;

            const message_value = toValue(message);
            
            if (toValue(condition)) {
                error.value = message_value;
            } else if (error.value == message_value) {
                error.value = null;
            }
        });
    }
}

validate('email', () => !/\w+@\w+\.\w+/.test(text.value), () => 'Не корректный email');
validate('required', () => !text.value, () => 'Это обязательно');
</script>

<style lang="scss" scoped>
.input {
    padding: 0.5rem 1rem;
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    
    outline: var(--primary-color);
    border-radius: 5px;

    &.red {
        border: 1px solid red;
    }
}

.input:focus {
    outline: var(--primary-color);
}
.error {
    color: red;
    font-size: 0.8rem;
}
</style>