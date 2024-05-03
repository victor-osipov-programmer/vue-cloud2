<template>
    <form class="registration-page">
        <div class="container registration-page__container">
            <AppInput 
                @submit.prevent
                v-for="el in form"
                v-model:text="el.text"
                v-model:error="el.error"
                v-model:validator="el.validator"
                v-bind="el.props"
            />

            <AppButton @click.prevent="registration">Войти</AppButton>
        </div>
        
    </form>
</template>

<script setup>
import AppInput from '@/components/AppInput.vue';
import { ref, toValue } from 'vue'
import { getBody } from '@/composables/form.ts'
import { usePopupStore } from '@/components/ThePopup'
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';
import { query } from '@/utils';
import { useUserStore } from '@/stores/user.store.ts'
const user = useUserStore()

const router = useRouter()
const popup = usePopupStore()

const form = ref({
    email: {
        text: '',
        error: null,
        validator: false,
        props: {
            required: true,
            email: true,
            name: 'email',
            placeholder: 'Email',
        }
    },
    password: {
        text: '',
        error: null,
        validator: false,
        props: {
            required: true,
            name: 'password',
            placeholder: 'Пароль',
        }
    },
})





async function registration() {
    for (let el in form.value) {
        form.value[el].validator = true
    }

    try {
        var response = await query('/authorization', {method: 'POST', body: getBody(form)})
    } catch (err) {
        return popup.show({ text: 'Проблемы с доступом к серверу' })
    }
    const json = await response.json();
    
    if (response.ok) {
        user.setToken(json.token)
        popup.show({ text: 'Вы успешно вошли!' })

        router.push('files')
    } else {
        const message = json.message;

        if (message?.startsWith('Duplicate')) {
            form.value.email.error = 'Этот email занят'
            popup.show({ text: 'Этот email занят' })
        } else if (message == 'Login failed') {
            popup.show({ text: 'Неверный логин и пароль' })
        } else {
            for (let property in message) {
                if (form.value.hasOwnProperty(property)) {
                    form.value[property].error = message[property][0]
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.registration-page__container {
    display: grid;
    gap: 1rem;
    padding: 1rem;
}
.app-button {
    grid-column: 2/3;
    
}
.app-input {
    max-width: 250px;
}
.registration-page {
    display: flex;
    align-items: center;
    min-height: 100dvh;
}
</style>