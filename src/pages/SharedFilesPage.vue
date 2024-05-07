<template>
  <div class="list-files">
    <p v-if="files.length === 0" class="message">Вам не давали доступ к файлам</p>

    <div class="buttons">
        <AppButton class="back" @click="back">Назад</AppButton>
    </div>

    

    <div class="files">
        <AppFile
            v-for="file in files"
            :id="file.file_id"
            :name="file.name"
        >
            <AppButton @click="downloadFile(file.file_id, file.name)">Скачать</AppButton>
        </AppFile>
    </div>
    

    
  </div>
</template>

<script setup>
import AppFile from "@/components/AppFile.vue";
import AppButton from "@/components/AppButton.vue";
import { query } from "@/utils";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store.ts";
import { downloadBlob } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter()
const user = useUserStore();
const files = ref([]);

function back() {
    router.push('/files')
}

function getFiles() {
  query("/shared", { token: user.token })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((json) => {
      files.value = json;
    });
}
getFiles();


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
}
.message {
    text-align: center;
    font-weight: normal;
    font-size: 2rem;
}
</style>
