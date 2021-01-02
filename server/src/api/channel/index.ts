import {Request, Response, Router} from "express";
import Message from "../../db/models/Message";
import Channel from "../../db/models/Channel";
export const router = Router();

// TODO: Input validiations
// TODO: Look on room id instead of channel id
// GET /channels/:channelId/messages
router.get("/:channelId/messages", async (req: Request, res: Response) => {
    const id = req.user!.id;
    const channelId = req.params.channelId; 
    const messages: Channel | null = await Channel.findOne({where: {id: channelId, user_id: id}, include: [
        {
            model: Message,
            required: true,
            as: 'messages'
        }
    ]});
    if(!messages) {
        return res.status(400).json({data: null, messages: 'No messages found', success: false});
    }
    return res.status(200).json({data: messages, message: '', success: true});
});

// POST /channels/:channelId/messages
router.post("/:channelId/messages", async (req: Request, res: Response) => {
    const id = req.user!.id; 
    const channelId = req.params.channelId;
    const body = req.body;

    const createdMessage = await Message.create({user_id: id, channel_id: channelId, body: body.content, room_id: body.room_id});
    return res.status(200).json({data: null, message: 'Successfully created Message!', success: true});
});
