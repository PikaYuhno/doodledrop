import {Request, Response, Router} from "express";
import Message from "../../db/models/Message";
import Channel from "../../db/models/Channel";
export const router = Router();

// TODO: Input validiations
// GET /api/channels/:roomId/messages
router.get("/:roomId/messages", async (req: Request, res: Response) => {
    const id = req.user!.id;
    const roomId = req.params.roomId; 
    const messages: Message[] | null = await Message.findAll({where: {room_id: roomId}})
    if(!messages) {
        return res.status(400).json({data: null, messages: 'No messages found', success: false});
    }
    return res.status(200).json({data: messages, message: 'Successfully found data', success: true});
});

// POST /api/channels/:roomId/messages
router.post("/:roomId/messages", async (req: Request, res: Response) => {
    const id = req.user!.id; 
    const roomId = req.params.roomId;
    const body = req.body;

    const createdMessage = await Message.create({user_id: id, body: body.content, room_id: roomId});
    return res.status(200).json({data: createdMessage, message: 'Successfully created Message!', success: true});
});

// PATCH /api/channels/:roomId/latestMessage
router.patch(":/roomId/latestMessage", async (req: Request, res: Response) => {
    const id = req.user!.id;
    const roomId = req.params.roomId;
    const latestMessage = req.body.latest_message;
    const count = await Channel.count({where: {room_id: roomId, user_id: id}});
    if(count === 0) return res.status(404).json({data: null, message: 'Channel not found!', success: false});

    await Channel.update({latest_message: latestMessage}, {where: {room_id: roomId, user_id: id}});
    return res.status(200).json({data: null, message: 'Successfully updated channel', success: true});
});
