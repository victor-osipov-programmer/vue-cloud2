<template>
  <div class="list-files">
    <div class="buttons">
        <AppButton @click="uploadFiles">Загрузка файлов</AppButton>
        <AppButton @click="sharedFiles">Общие файлы</AppButton>
    </div>

    <div class="files">
        <AppFile
            v-for="file in user.files"
            :id="file.file_id"
            :name="file.name"
        >
            <AppButton class="delete" @click="removeFile(file.file_id)">Удалить</AppButton>
            <AppButton @click="editFile(file.file_id)">Редактировать</AppButton>
            <AppButton @click="rightsFile(file.file_id)">Права</AppButton>
            <AppButton @click="downloadFile(file.file_id, file.name)">Скачать</AppButton>
        </AppFile>
    </div>

   
  </div>
</template>

<script setup>
import AppFile from "@/components/AppFile.vue";
import { query } from "@/utils";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store.ts";
import { downloadBlob } from "@/utils";
import AppButton from "@/components/AppButton.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const user = useUserStore();
// const files = ref([]);

function sharedFiles() {
    router.push('/shared-files')
}

function uploadFiles() {
    router.push('/upload-files')
}

function getFiles() {
  query("/files/disk", { token: user.token })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((json) => {
      user.setFiles(json)
    });
}
getFiles();

function editFile(id) {
    user.setEditFileId(id)
    router.push('/edit-file')
}

function rightsFile(id) {
    user.setEditFileId(id)
    router.push('/rights')
}

async function removeFile(id) {
  await query("/files/" + id, { method: "DELETE", token: user.token });
  getFiles();
}
async function downloadFile(id, name) {
  const response = await query("/files/" + id, {
    method: "GET",
    token: user.token,
  });
  const blob = await response.blob();
  downloadBlob(blob, name);
  getFiles();
}
</script>

<style lang="scss" scoped>
.buttons {
    display: flex;
    justify-content: center;
    margin-block: 3rem;
    gap: 1rem;
}
</style>
