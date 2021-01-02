import {Server} from "http";
import socketio, {Socket} from 'socket.io';

export default (server: Server) => {
    const io = socketio(server);

    io.on('connect', (socket: Socket) => {
        console.log(socket.id + " connected");
        // FIX: Channel has to be a string
        socket.on('channel-join', (channel: any) => {
            console.log("Joined Channel - ", channel);
            socket.join(channel.channelId); 
        });

        //TODO: Sending message to room doesn't work
        socket.on('message', (message: any) => {
            console.log("Got data - ", message);
            console.log(socket.rooms);
            socket.broadcast.to(message.channelId).emit("message", message.data);
            /*socket.broadcast.emit("message", message.data);
            socket.broadcast.emit("test", "Hello");
            io.sockets.emit("message", message.data);*/
        });

        socket.on('disconnect', () => {
            console.log(socket.id + " disconnected");  
        });
    });
}
