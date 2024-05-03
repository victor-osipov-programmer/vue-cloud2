import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
    state: () => {
        return {
            text: '',
            open: false,
            stop: null as null | ReturnType<typeof setTimeout>
        }
    },
    actions: {
        show({text, timeout = 3000}) {
            if (this.stop) clearTimeout(this.stop);
            this.text = text;
            this.open = true;

            this.stop = setTimeout(() => {
                this.$reset()
            }, timeout);
        }
    },
})