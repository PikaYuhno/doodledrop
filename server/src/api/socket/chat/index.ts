import {Server} from "http";
import socketio, {Socket} from 'socket.io';

let usersDrawing: UserDrawing[] = [];

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

        socket.on("drawing-join", (userJoin: any) => {
            socket.join(userJoin.room_id);
            let drawing = usersDrawing.find(el => el.room_id === userJoin.room_id);
            if(!drawing){
                let item = {room_id: userJoin.room_id, users:[userJoin.user_id]};
                usersDrawing.push(item);
                socket.emit("drawing-join", item);
            } else {
                drawing.users.push(userJoin.user_id); 
                socket.emit("drawing-join", drawing);
            }
        });

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

type UserDrawing = {
    room_id: string;
    users: number[];
}
