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

export const channelUpdated = (message: Message) => {
    return {
        type: "CHANNEL_UPDATE_LATEST_MSG",
        payload: {message}
    };
}

export const channelUpdatedNotfi = (roomId: string) => {
    return {
        type: "CHANNEL_UPDATE_NOTFI",
        payload: {
            room_id: roomId
        }
    }
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

export const channelAdded = (channel: Channel) => {
    return {
        type: "CHANNEL_ADDED",
        payload: {
            channel
        }
    }
}

export const channelLogout = () => {
    return {
        type: "CHANNEL_LOGOUT",
    }
}

export const addMessage = (message: Message, channels: Channel[]) => async (dispatch: (arg: ReturnType<typeof messageAdded | typeof channelAdded>) => void) => {
    const channel = channels.find((channel: Channel) => {
        return channel.room_id === message.room_id
    });
    if(!channel) {
        // request channel
        const promise = await fetch(`/api/users/@me/channels`, {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                room_id: message.room_id,
                recipient_id: message.user_id,
                latest_message: message.body,
            })
        });
        const resJson = await promise.json();
        console.log(resJson);
        if(resJson.success) {
            // add channel to redux store
            dispatch(channelAdded(resJson.data));
        }

    } else {
        // add message
        dispatch(messageAdded(message));
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
    socket.on("connect", () => {
        console.log("RECONNECTED AGAIN");
    });
    dispatch(socketConnected(socket));
}

export const disconnectSocket = (socket: SocketIOClient.Socket) => async (dispatch: (arg: ReturnType<typeof socketDisconnected>) => void) => {
    socket.disconnect();
    socket.removeAllListeners();
    console.log("Socket: disconnect");
    dispatch(socketDisconnected());
}

export const recieveMessages = (roomId: string) => async (dispatch: (arg: ReturnType<typeof messagesRecieved | typeof alert>) => void) => {
    let token = localStorage.getItem("token");
    if(!token) {
        dispatch(alert("Failed to load messages", AlertType.FAIL, 3));
        return;
    }
    const promise = await fetch(`/api/channels/${roomId}/messages`, {
        headers: {
            "Authorization": token 
        }
    });
    const jsonRes = await promise.json();
    if(jsonRes.success ) {
        dispatch(messagesRecieved(jsonRes.data)); 
    }
}
