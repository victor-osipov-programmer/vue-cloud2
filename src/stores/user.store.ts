import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import type { IFile } from '@/types'

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const files = ref<IFile[]>([])
    const edit_file_id = ref(null)
    const edit_file = computed(() => {
        if (edit_file_id.value) {
            return files.value.find((file: IFile) => file.file_id == edit_file_id.value)
        } else return null;
    })
    const coauthors = computed(() => {
        if (edit_file.value) {
            return edit_file.value.accesses.filter(access => access.type == 'co-author')
        } else return []
    })

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
    }
    if (localStorage.getItem('edit_file_id')) {
        setEditFileId(localStorage.getItem('edit_file_id'))
    }

    function setToken(_token) {
        token.value = toValue(_token)
        localStorage.setItem('token', _token)
    }
    function setFiles(_files) {
        files.value = toValue(_files)
    }
    function setEditFileId(_id) {
        edit_file_id.value = toValue(_id)
        localStorage.setItem('edit_file_id', _id)
    }
    
    return { token, setToken, files, setFiles, edit_file_id, setEditFileId, edit_file, coauthors }
})
