import {Server} from "http";
import socketio, {Socket} from 'socket.io';

export default (server: Server) => {
    const io = socketio(server);

    io.on('connect', (socket: Socket) => {
        console.log(socket.id + " connected");

        socket.on("join-room", (id: number) => {
            let room: string = "user-room-" + id;
            //socket.join(room);
            socket.join(room);
            console.log("Joined room - ", room);
        });

        // FIX: Channel has to be a string
        /*socket.on('channel-join', (channel: any) => {
            console.log("Joined Channel - ", channel);
            socket.join(channel.channelId); 
        });*/

        socket.on('message', (message: any) => {
            console.log("Got data - ", message);
            console.log(socket.rooms);
            socket.broadcast.to("user-room-"+message.receiver_id).emit("message", message);
        });

        socket.on('disconnect', () => {
            console.log(socket.id + " disconnected");  
        });
    });
}
