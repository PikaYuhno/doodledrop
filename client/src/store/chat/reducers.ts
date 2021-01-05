import {ChatState, ChatActionTypes} from "./types";
import {Channel} from '../../global';


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
        case "CHANNEL_UPDATE_LATEST_MSG":
             
            return {
                ...state,
                channels: state.channels.map((channel: Channel) => channel.room_id === action.payload.message.room_id ? {
                    ...channel, 
                    last_message: action.payload.message.body,
                    date: action.payload.message.created_at,
                    notfi: action.payload.notfi
                } : channel)
            }

        case "CHANNEL_UPDATE_NOTFI":
            return {
                ...state,
                channels: state.channels.map((channel: Channel) => channel.room_id === action.payload.room_id ? {
                    ...channel, 
                    notfi: false
                } : channel)
            }
        case "CHANNEL_ADDED":
            return {
                ...state,
                channels: [...state.channels, action.payload.channel]
            }
        case "CHANNEL_LOGOUT":
            return {
                ...state,
                currentChannel: null,
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
