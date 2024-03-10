import { defineStore } from 'pinia'

export const useCommunicationStore = defineStore('communication', {
    state: () => ({
        loginOrRegisterVisible: false,
        imageViewerVisible: false,
        imageViewerSrc: ''
    })
})
