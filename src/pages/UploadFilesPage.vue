<template>
    <div class="upload-files-page">
        <label class="input-files" for="input-file" @dragover="handleDragOver" @drop="selectedFiles" @change="selectedFiles">
            <h2 class="title">Загрузить файлы</h2>
            
            <div class="drop">
                <img class="drop-img" src="@/assets/img/UPLOAD.png" alt="UPLOAD">

            </div>

            <input id="input-file" type="file" name="files" multiple>
        </label>

        <AppButton class="back" @click="back">Назад</AppButton>

        <AppFile
            v-for="file in files"
            :name="file.name"
        >
            <div class="mark" :class="{'mark-upload': file.mark == 'Загружается...', 'mark-done': file.mark == 'Загружен', 'mark-error': file.mark == 'Ошибка'}">
                {{ file.mark }}
            </div>
            <AppButton v-if="file.mark == 'Загружен'" @click="downloadFile(file.file_id, file.name)">Скачать</AppButton>
        </AppFile>
        
    </div>
</template>

<script lang="ts" setup>
import AppFile from '@/components/AppFile.vue';
import { downloadBlob, query, queryFormData } from '@/utils';
import { ref, onMounted } from 'vue';
import AppButton from '@/components/AppButton.vue';
import type { IFile } from '@/types';
import { useRouter } from 'vue-router';

// const publicPath = ref(import.meta.env.BASE_URL)

const router = useRouter()
const files = ref<IFile[]>([])
// const user = useUserStore();
const is_files_upload = ref(false)

function back() {
    router.push('/files')
}

function computeMark(file) {
    return file.success  ? 'Загружен' : is_files_upload.value ? 'Ошибка' : 'Загружается...'
}

async function selectedFiles(e) {
    e.preventDefault();
    is_files_upload.value = false;

    const selected_files = e.target.files ?? e.dataTransfer.files;
    let formData = new FormData(); 
    
    // console.log('selected_files', selected_files)
    files.value = [...selected_files].map(file => {
        file.mark = computeMark(file)
        return file;
    });;
    console.log('files.value', files.value)


    for (let i = 0; i < selected_files.length; i++) {
        const selected_file = selected_files[i]
        formData.append('files', selected_file, selected_file.name)
    }


    const response = await queryFormData('/files', {
        method: 'POST',
        body: formData
    })
    const json = await response.json()
    console.log('json', json)
    
    is_files_upload.value = true;
    files.value = json.map(file => {
        file.mark = computeMark(file)
        return file;
    });
}


function handleDragOver(e) {  
    e.preventDefault();
}

async function downloadFile(id, name) {
  const response = await query("/files/" + id, {
    method: "GET",
  });
  const blob = await response.blob();
  downloadBlob(blob, name);
}
</script>

<style lang="scss" scoped>

.mark {
    display: flex;
    align-items: center;
    background-color: var(--primary-color);
    border-radius: 5px;
    min-height: 40px;
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    text-transform: uppercase;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
}
.back {
    margin-block: 3rem;
}

.mark-upload {
    background-color: var(--primary-color);
}
.mark-done {
    background-color: var(--green-color);
}
.mark-error {
    background-color: var(--red-color);
}

.app-file {
    width: 100%;
}
.input-files {
    // margin-bottom: 2rem;
    cursor: pointer;
}
.title {
    font-weight: normal;
    margin-bottom: 0.5rem;
}
#input-file {
    position: absolute;
    visibility: hidden;
}
.upload-files-page {
    align-items: center;
}

.drop {
    background-color: var(--primary-color);
    width: 100%;
    height: 100px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
}
.drop-img {
    filter: invert(1);
}
</style>