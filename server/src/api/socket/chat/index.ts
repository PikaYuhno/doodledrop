import {Server} from "http";
import socketio, {Socket} from 'socket.io';

let usersDrawing: UserDrawing[] = [];

type Line = {
    x: number;
    y: number;
    pX: number;
    pY: number;
    strokeWeight: number;
    fill: string;
}

enum DrawingActions {
    CLEAR,
    REDO,
    UNDO,
}

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
            console.log("Drawing - Joined");
            socket.join(userJoin.room_id);
            let drawing = usersDrawing.find(el => el.room_id === userJoin.room_id);
            if(!drawing){
                let item = {room_id: userJoin.room_id, users:[socket.id]};
                usersDrawing.push(item);
                io.sockets.in(userJoin.room_id).emit("drawing-response", item);
            } else {
                drawing.users.push(socket.id); 
                io.sockets.in(userJoin.room_id).emit("drawing-response", drawing);
            }
        });

        socket.on("drawing", (data: {line: Line, room_id: string}) => {
            socket.broadcast.to(data.room_id).emit("drawing", data);
        });

        socket.on("drawing-action", (data: {action: DrawingActions, room_id: string}) => {
            socket.broadcast.to(data.room_id).emit("drawing-action", data);
        })

        socket.on("drawing-leave", (userLeave: any) => {
            console.log("Drawing - Left");
            console.log("Left rooms", socket.rooms);
            let item = usersDrawing.find(el => el.room_id === userLeave.room_id);
            item && (item.users = item.users.filter(el => el !== socket.id))
            socket.to(userLeave.room_id).emit("drawing-response", item);
            socket.leave(userLeave.room_id);
            console.log(usersDrawing);
            
        })

        socket.on('message', (message: any) => {
            console.log("Got data - ", message);
            console.log(socket.rooms);
            socket.broadcast.to("user-room-"+message.receiver_id).emit("message", message);
        });

        socket.on('disconnect', () => {
            usersDrawing.forEach(el => {
                el.users = el.users.filter(id => id !== socket.id);
            });
            console.log(socket.id + " disconnected");  
        });
    });
}

type UserDrawing = {
    room_id: string;
    users: string[];
}
