import {Message, Channel} from "../../global";
import {alert} from "../alert/actions";
import {AlertType} from "../alert/types";
import io from 'socket.io-client';

export const channelsLoaded = (channels: Channel[]) => {
    return {
        type: "CHANNELS_LOADED",
        payload: {
            channels
        }
    };
}

export const channelConnected = (channel: Channel) => {
    return {
        type: "CHANNEL_CONNECTED",
        payload: {
            channel
        }
    };
}

export const channelDisconnected = () => {
    return {
        type: "CHANNEL_DISCONNECTED"
    };
}

export const socketConnected = (socket: SocketIOClient.Socket) => {
    return {
        type: "SOCKET_CONNECTED",
        payload: {
            socket
        }
    };
}

export const socketDisconnected = () => {
    return {
        type: "SOCKET_DISCONNECTED",
    }
}

export const messagesRecieved = (messages: Message[]) => {
    return {
        type: "MESSAGES_RECIEVED",
        payload: {
            messages
        }
    }
}

export const messageAdded = (message: Message) => {
    return {
        type: "MESSAGE_ADDED",
        payload: {
            message
        }
    }
}

export const loadChannels = () => async (dispatch: (arg: ReturnType<typeof channelsLoaded | typeof alert>) => void) =>  {
    let token = localStorage.getItem("token");
    if(!token) {
        dispatch(alert("Loading Failed!", AlertType.FAIL, 3));
        return;
    }
    const promise = await fetch(`/api/users/@me/channels`, {
        headers: {
            "Authorization": token 
        }
    });
    const jsonRes = await promise.json();
    if(jsonRes.success) {
        dispatch(channelsLoaded(jsonRes.data)); 
    }
}


export const connectSocket = () => async (dispatch: (arg: ReturnType<typeof socketConnected>) => void) => {
    const socket = io("http://localhost:4000/");    
    console.log("Socket: connected");
    dispatch(socketConnected(socket));
}

export const disconnectSocket = (socket: SocketIOClient.Socket) => async (dispatch: (arg: ReturnType<typeof socketDisconnected>) => void) => {
    socket.disconnect();
    socket.removeAllListeners();
    console.log("Socket: disconnect");
    dispatch(socketDisconnected());
}

export const recieveMessages = (channelId: number) => async (dispatch: (arg: ReturnType<typeof messagesRecieved | typeof alert>) => void) => {
    let token = localStorage.getItem("token");
    if(!token) {
        dispatch(alert("Failed to load messages", AlertType.FAIL, 3));
        return;
    }
    const promise = await fetch(`/api/channels/${channelId}/messages`, {
        headers: {
            "Authorization": token 
        }
    });
    const jsonRes = await promise.json();
    if(jsonRes.success) {
        console.log("Mesages", jsonRes.data.messages);
        dispatch(messagesRecieved(jsonRes.data.messages)); 
    }
}
