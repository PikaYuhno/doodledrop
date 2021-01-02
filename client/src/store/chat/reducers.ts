import {ChatState, ChatActionTypes} from "./types";


// TODO: Implement messagse, maybe add isLoaded
const initialState: ChatState = {
    channels: [],
    currentChannel: null,
    socket: null,
    messages: []
}

export default (state = initialState, action: ChatActionTypes): ChatState => {
    switch(action.type) {
        case "CHANNELS_LOADED":
            return {
                ...state,
                channels: action.payload.channels
            }
        case "CHANNEL_CONNECTED":
            return {
                ...state,
                currentChannel: action.payload.channel
            }
        case "CHANNEL_DISCONNECTED":
            return {
                ...state,
                currentChannel: null
            }
        case "SOCKET_CONNECTED":
            return {
                ...state,
                socket: action.payload.socket
            }
        case "SOCKET_DISCONNECTED":
            return {
                ...state,
                socket: null
            }
        case "MESSAGES_RECIEVED":
            return {
                ...state,
                messages: action.payload.messages
            }
        case "MESSAGE_ADDED":
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }
        default:
            return state;
    }
}
