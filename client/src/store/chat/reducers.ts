import * as types from "./types";
import {Channel} from '../../global';


const initialState: types.ChatState = {
    channels: [],
    currentChannel: null,
    socket: null,
    messages: [],
    drawingRoom: null
}

const reducer = (state = initialState, action: types.ChatActionTypes): types.ChatState => {
    switch(action.type) {
        case types.CHANNELS_LOADED:
            return {
                ...state,
                channels: action.payload!.channels
            }
        case types.CHANNEL_CONNECTED:
            return {
                ...state,
                currentChannel: action.payload!.channel
            }
        case types.CHANNEL_DISCONNECTED:
            return {
                ...state,
                currentChannel: null
            }
        case types.CHANNEL_UPDATE_LATEST_MSG:
             
            return {
                ...state,
                channels: state.channels.map((channel: Channel) => channel.room_id === action.payload!.message.room_id ? {
                    ...channel, 
                    last_message: action.payload!.message.body,
                    date: action.payload!.message.created_at,
                    notfi: action.payload!.notfi
                } : channel)
            }

        case types.CHANNEL_UPDATE_NOTFI:
            return {
                ...state,
                channels: state.channels.map((channel: Channel) => channel.room_id === action.payload!.room_id ? {
                    ...channel, 
                    notfi: false
                } : channel)
            }
        case types.CHANNEL_ADDED:
            return {
                ...state,
                channels: [...state.channels, action.payload!.channel]
            }
        case types.CHANNEL_LOGOUT:
            return {
                ...state,
                currentChannel: null,
            }
        case types.SOCKET_CONNECTED:
            return {
                ...state,
                socket: action.payload!.socket
            }
        case types.SOCKET_DISCONNECTED:
            return {
                ...state,
                socket: null
            }
        case types.MESSAGES_RECIEVED:
            return {
                ...state,
                messages: action.payload!.messages
            }
        case types.MESSAGE_ADDED:
            return {
                ...state,
                messages: [...state.messages, action.payload!.message]
            }

        case types.ENTER_DRAWING:
            return {
                ...state,
                drawingRoom: action.payload!.room_id 
            }
        case types.LEAVE_DRAWING:
            return {
                ...state,
                drawingRoom: null
            }
        default:
            return state;
    }
}
export default reducer;
