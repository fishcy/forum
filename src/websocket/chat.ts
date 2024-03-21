import type { WebSocketMessage } from '@/types/global.d.ts'
import { ref, watch } from 'vue'
import { useUserInfoStore } from '@/stores'

export const sendMessage = ref<WebSocketMessage>()
export const receiveMessage = ref<WebSocketMessage>()

watch(sendMessage, (newVal) => {
    ws.send(JSON.stringify(newVal))
})

const charUrl = import.meta.env.VITE_CHAT_URL

let ws: WebSocket
let webSocketState = false
const time = 1000 // 心跳时间间隔
const timeout = 1000 // 心跳超时间隔

export const connect = () => {
    try {
        ws = new WebSocket(charUrl)
        init()
    } catch (err) {
        console.log(err)
    }
}

export const init = () => {
    ws.onopen = () => {
        handleOpen()
    }

    ws.onmessage = (event) => {
        const data: WebSocketMessage = JSON.parse(event.data)
        switch (data.type) {
            case 'login':
                break
            case 'heart_beat':
                webSocketState = true
                console.log(data.content)
                break
            case 'private':
                receiveMessage.value = data
                break
            case 'group':
                break
        }
    }

    ws.onclose = handleClose

    ws.onerror = handleError

    webSocketState = false
}

const handleOpen = () => {
    const { getAuth } = useUserInfoStore()
    // socket状态设置为连接
    webSocketState = true
    startHeartBeat(time)
    const message = JSON.stringify({
        type: 'login',
        from: '',
        to: '',
        content: `Authorization: ${getAuth()}`,
        creat_time: 0
    })
    ws.send(message)
}

const handleClose = () => {
    webSocketState = false
}

const handleError = () => {
    webSocketState = false
    ws.close()
    setTimeout(() => {
        connect()
    }, 1000)
}

const startHeartBeat = (time: number) => {
    const message = JSON.stringify({
        type: 'heart_beat',
        from: '',
        to: '',
        content: 'ping',
        creat_time: 0
    })
    setTimeout(() => {
        ws.send(message)
        waitingServer()
    }, time)
}

// 延时等待服务端响应，通过webSocketSate判断是否连接成功
const waitingServer = () => {
    webSocketState = false
    setTimeout(() => {
        if (webSocketState) {
            startHeartBeat(time)
            return
        }
        try {
            ws.close()
        } catch (err) {
            console.log(err)
        }
        connect()
    }, timeout)
}
