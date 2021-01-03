import {Action, Channel, Message} from '../../global';

export const CHANNELS_LOADED = "CHANNELS_LOADED";
export const CHANNEL_CONNECTED = "CHANNEL_CONNECTED";
export const CHANNEL_DISCONNECTED = "CHANNEL_DISCONNECTED";
export const CHANNEL_UPDATE_LATEST_MSG = "CHANNEL_UPDATE_LATEST_MSG";
export const CHANNEL_UPDATE_NOTFI = "CHANNEL_UPDATE_NOTFI";
export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_DISCONNECTED = "SOCKET_DISCONNECTED";
export const MESSAGES_RECIEVED = "MESSAGES_RECIEVED";
export const MESSAGES_ADDED = "MESSAGES_ADDED";

export type ChatState = {
    channels: Channel[];
    currentChannel: Channel | null;
    socket: SocketIOClient.Socket | null;
    messages: Message[];
}

export type ChatActionTypes = Action<"CHANNELS_LOADED", {channels: Channel[]}> | Action<"CHANNEL_CONNECTED", {channel: Channel}> |
    Action<"CHANNEL_DISCONNECTED"> |
    Action<"SOCKET_CONNECTED", {socket: SocketIOClient.Socket}> | 
    Action<"SOCKET_DISCONNECTED"> |
    Action<"MESSAGES_RECIEVED", {messages: Message[]}> | 
    Action<"MESSAGE_ADDED", {message: Message}> | 
    Action<"CHANNEL_UPDATE_LATEST_MSG", {message: Message}> |
    Action<"CHANNEL_UPDATE_NOTFI", {room_id: string}>
    
