<template>
    <div class="edit-file">
        <div class="buttons">
            <AppInput v-model:text="new_name" required/>
            <AppButton class="back" @click="back">Назад</AppButton>
            <AppButton @click="save">Сохранить</AppButton>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import { ref } from 'vue';
import { useUserStore } from "@/stores/user.store";
import { useRouter } from 'vue-router';
import type { IFile } from '@/types';
import { query } from '@/utils';

const router = useRouter()
const user = useUserStore();
const new_name = ref('');
const edit_file = ref<IFile | null>(null)

if (user.edit_file_id) {
    const file = user.files.find(file => file.file_id == user.edit_file_id)
    
    if (file) {
        edit_file.value = file;
        new_name.value = edit_file.value.name;



    }
}

function back() {
    router.push('/files')
}

function save() {
    query('/files/' + edit_file.value?.file_id, { method: 'PATCH', body: { name: new_name.value } })
}
</script>

<style lang="scss" scoped>
.edit-file {
    align-items: center;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}
.app-input {
    grid-column: 1/3;
}
</style>