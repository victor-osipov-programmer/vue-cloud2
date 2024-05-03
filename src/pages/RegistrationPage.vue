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

            <!-- <AppButton >Войти</AppButton> -->
            <RouterLink class="auth" to="/auth">Войти</RouterLink>
            <AppButton class="registration" @click.prevent="registration">Зарегаться</AppButton>
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
    first_name: {
        text: '',
        error: null,
        validator: false,
        props: {
            required: true,
            name: 'first_name',
            placeholder: 'Имя',
        }
    },
    last_name: {
        text: '',
        error: null,
        validator: false,
        props: {
            required: true,
            name: 'last_name',
            placeholder: 'Фамилия',
        }
    },
})


function auth() {
    router.push('/auth')
}


async function registration() {
    for (let el in form.value) {
        form.value[el].validator = true
    }

    try {
        var response = await query('/registration', {method: 'POST', body: getBody(form)})
    } catch (err) {
        return popup.show({ text: 'Проблемы с доступом к серверу' })
    }
    const json = await response.json();
    if (response.ok) {

        popup.show({ text: 'Вы успешно зарегались!' })

        router.push('/auth')
    } else {
        const message = json.message;

        if (response.status == 500 && message?.startsWith('Duplicate')) {
            form.value.email.error = 'Этот email занят'
            popup.show({ text: 'Этот email занят' })
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
    grid-template-columns: repeat(2, 1fr);
}
.auth {
    align-self: flex-end;
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