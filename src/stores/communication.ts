import { defineStore } from 'pinia'

export const useCommunicationStore = defineStore('communication', {
    state: () => ({
        loginOrRegisterVisible: false
    })
})
