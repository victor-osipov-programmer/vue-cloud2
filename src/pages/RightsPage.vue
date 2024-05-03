<template>
    <div class="rights-page">
        <div class="files">
            <div class="users" v-if="user.coauthors.length !== 0">
                <AppUser v-for="access in user.coauthors" :fullname="access.fullname" :email="access.email">
                    <AppButton class="delete" @click="removeRight(access.email)">Удалить</AppButton>
                </AppUser>
            </div>
            
            <h4 class="message" v-if="user.coauthors.length === 0">
                Соавторы отсутсвуют
            </h4>

            
                
            <div class="add-email">
                <AppButton class="back" @click="back">Назад</AppButton>
            
                <AppInput v-model:text="new_email" required email />
                <AppButton @click="addEmail">Добавить</AppButton>
            </div>

            

            
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppUser from "@/components/AppUser.vue";
import AppInput from "@/components/AppInput.vue";
import { query } from "@/utils";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { downloadBlob } from "@/utils";
import AppButton from "@/components/AppButton.vue";
import { useRouter } from "vue-router";
import type { IFile } from '@/types'

const router = useRouter();
const user = useUserStore();
const new_email = ref('')

function getFiles() {
    query("/files/disk", { token: user.token })
        .then((response) => {
            if (response.ok) return response.json();
        })
        .then((json: IFile[]) => {
            user.setFiles(json);
        });
}
getFiles();

function back() {
    router.push('/files')
}

async function addEmail() {
    await query(`/files/${user.edit_file?.file_id}/accesses`, { method: "POST", body: {
        email: new_email.value
    }});
    getFiles();
}

async function removeRight(email: string) {
    await query(`/files/${user.edit_file?.file_id}/accesses`, { method: "DELETE", body: {
        email
    }});
    getFiles();
}
</script>

<style lang="scss" scoped>

.message {
    text-align: center;
    font-weight: normal;
    font-size: 2rem;
}
.users, .message {
    margin-bottom: 3rem;
}
.add-email {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
}
:deep(.input) {
    min-height: 40px;
}
.back {
    margin-right: 5rem;
}
</style>
