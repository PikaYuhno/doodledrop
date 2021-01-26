import { Request, Response, Router } from "express";
import Channel from "../../db/models/Channel";
import Comment from "../../db/models/Comment";
import Doodle from "../../db/models/Doodle";
import Follower from "../../db/models/Follower";
import Recipient from '../../db/models/Recipient';
import Notification from '../../db/models/Notification';
export const router = Router();
import User from "../../db/models/User";
import { userPostSchema, userPatchSchema } from "../../schemas/userSchemas";
import {v4 as uuid} from 'uuid';
import {Sequelize, QueryTypes} from "sequelize";
import {sequelize} from "../../db/connection";
import bcrypt from 'bcrypt';

// GET /api/users/friends
router.get("/friends", async (req: Request, res: Response) => {
    const id = req.user!.id;
    //const data: any[] = await sequelize.query(`SELECT * FROM users AS u WHERE u.id IN (SELECT f.user_id FROM followers AS f WHERE f.follower_id = ${id}) AND u.id IN (SELECT f.follower_id FROM followers AS f WHERE f.user_id = ${id})`, { 
    const data: any[] = await sequelize.query(` SELECT * FROM users AS u WHERE u.id IN (SELECT f.user_id FROM followers AS f WHERE f.follower_id = ${id}) AND u.id IN (SELECT f.follower_id FROM followers AS f WHERE f.user_id = ${id}) AND ( select count(*) from channels inner join recipients on channels.id = recipients.channel_id and recipients.user_id = u.id where channels.user_id=${id})=0;`, {
      type: QueryTypes.SELECT
    });

    let exclude: string[] = ["password"];
    for(let j = 0; j < data.length; j++) {
        for(let i = 0; i < exclude.length; i++) {
            if(data[j].hasOwnProperty(exclude[i])) {
                delete data[j][exclude[i]];
            }
        }
    }
    return res.status(200).json({data, message: 'Successfully found friends!', success: true});
});

// GET /api/users/
router.get("/", async (req: Request, res: Response) => {
    const username = req.query.username;
    let users: User[] = [];
    const attributes = {exclude: ['password']};
    if(username) {
        users = await User.findAll({where: {username: Sequelize.where(Sequelize.col('username'), 'LIKE', `%${username}%`)}, attributes});
    } else {
        users = await User.findAll({attributes});
    }
    return res.status(200).json({ data: users, message: "", success: true });
});

// GET /api/users/doodles
router.get("/doodles", async (req: Request, res: Response) => {
    let user = req.user;
    let doodles: Doodle[] = await Doodle.findAll({
        where: { id: user!.id },
        include: [
            {
                model: Comment,
                required: true,
            },
        ],
    });
    return res.status(200).json({ data: doodles, message: "", success: true });
});

router.get("/notifications/", async (req: Request, res: Response) => {
    const id = req.user!.id;
    
    const notifications = await Notification.findAll({where: {user_id: id} });

    return res.status(200).json({data: notifications, message: 'Successfully found notifications!', success: true});
});

// GET /api/users/:id
router.get("/:id", async (req: Request, res: Response) => {
    let userId = req.params.id;
    let user: User | null = await User.findOne({ where: { id: userId }, attributes: {exclude: ['password']} });
    if (!user) {
        return res
            .status(404)
            .json({ data: null, message: "User not found!", success: false });
    }
    return res.status(200).json({
        data: user,
        message: "Successfully found User!",
        success: true,
    });
});

// POST /api/users/
router.post("/", async (req: Request, res: Response) => {
    let body = req.body;
    console.log("Body", body);
    try {
        const value = await userPostSchema.validateAsync(body);
        const created: User = await User.create(value);
        return res.status(201).json({
            data: created,
            message: "Successfully created User!",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            data: null,
            message: error.details[0].message,
            success: false,
        });
    }
});

// PATCH /api/users/:id
router.patch("/:id", async (req: Request, res: Response) => {
    let body = req.body;
    let id = req.params.id;
    if (!id)
        return res
            .status(400)
            .json({ data: null, message: "ID not specified!", success: false });

    try {
        let count: number = await User.count({ where: { id } });
        if (count === 0)
            return res.status(400).json({
                data: null,
                message: "User not foung!",
                success: false,
            });
        const value = await userPatchSchema.validateAsync(body);
        await User.update(value, { where: { id } });
        return res.status(200).json({
            data: null,
            message: "Successfully updated User!",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            data: null,
            message: error.details[0].message,
            success: false,
        });
    }
});

// DELETE /api/users/:id
router.delete("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    if (!id)
        return res
            .status(400)
            .json({ data: null, message: "ID not specified!", success: false });

    try {
        let count: number = await User.count({ where: { id } });
        if (count === 0)
            return res.status(400).json({
                data: null,
                message: "User not foung!",
                success: false,
            });
        await User.destroy({ where: { id } });
        return res.status(200).json({
            data: null,
            message: "Successfully deleted User!",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            data: null,
            message: error.details[0].message,
            success: false,
        });
    }
});

//POST /api/users/follow/:id
router.post("/follow/:id", async (req: Request, res: Response) => {
    const id = req.params.id; 
    const curId = req.user!.id;
    const count = await User.count({where: {id}});
    if (count === 0) return res.status(404).json({data: null, message: 'User not found', success: false});
    const followEntry = await Follower.create({user_id: curId, follower_id: id});
    await Notification.create({user_id: id, content: `${req.user!.username} started following you!`})
    return res.status(200).json({data: followEntry, message: 'Successfully followed user!', success: true});
});

// DELETE /api/users/unfollow/:id
router.delete("/unfollow/:id", async (req: Request, res: Response) => {
    const id = req.params.id; 
    const curId = req.user!.id;
    const deleted = await Follower.destroy({where: {user_id: curId, follower_id: id}});
    return res.status(200).json({data: null, message: 'Successfully unfollowed user!', success: true});
});

// TODO: Input validiations
// GET /api/users/@me/channels
router.get("/@me/channels", async (req: Request, res: Response) => {
    const id = req.user!.id; 
    let channels: Channel[] | null = await Channel.findAll({where: {user_id: id},
        include: [{
            model: Recipient,
            required: true,
            as: 'recipients'
        }],
    });

    if(!channels) 
        return res.status(400).json({data: null, message: 'No channels found!', success: false});

    return res.status(200).json({data: channels, message: '', success: true});
});

// GET /api/users/@me/channels/:roomId
router.get("/@me/channels/:roomId", async (req: Request, res: Response) => {
    const roomId = req.params.roomId; 
    const userId = req.user!.id;

    const channel: Channel | null = await Channel.findOne({where: {room_id: roomId, user_id: userId},
        include: [{
            model: Recipient,
            required: true,
            as: 'recipients'
        }],
    });
    if(!channel) return res.status(404).json({data: null, message: 'Channel not found!', success: false});
    
    return res.status(200).json({data: channel, message: '', success: true});
});

router.post("/@me/channels", async (req: Request, res: Response) => {
    const id = req.user!.id;
    const recipientId = req.body.recipientId;
    
    if(id === recipientId)
        return res.status(400).json({data: null, message: 'Cannot create a channel with your self!', success: false});

    const me: User | null = await User.findOne({where: {id}, attributes: ['id', 'username', 'avatar']});
    const recipient: User | null = await User.findOne({where: {id: recipientId}, attributes: ['id', 'username', 'avatar']});
    if (!recipient || !me) 
        return res
            .status(404)
            .json({ data: null, message: "User not found!", success: false });

        try {
            const room_id = uuid();
            let channelMe = await Channel.create({user_id: id, type: 1, room_id});
            let channelRec = await Channel.create({user_id: recipient.id, type: 1, room_id});

            await Recipient.create({user_id: recipient.id, avatar: recipient.avatar, channel_id: channelMe.id, username: recipient.username}) 
            await Recipient.create({user_id: me.id, avatar: me.avatar, channel_id: channelRec.id, username: me.username}) 

            let channel = await Channel.findOne({where: {user_id: id, room_id}, include: [{
                model: Recipient,
                required: true,
                as: 'recipients'
            }]});

            return res.status(200).json({data: channel, message: 'Successfully created DM Channel!', success: true});
        } catch (error) {
            console.error(error);
            return res.status(400).json({data: null, message: error, success: false});
        }
});

// GET  /api/users/following/:id
router.get("/following/:id", async (req: Request, res: Response) => {
    let id = req.params.id;

    console.log(id);

    const following: any[] = await sequelize.query(`SELECT followers.user_id, followers.follower_id, users.* FROM users INNER JOIN followers ON users.id = followers.follower_id WHERE followers.user_id = ${id};`, {
        type: QueryTypes.SELECT
      });

    return res.status(200).json({ data: following, message: "", success: true });
});

// GET /api/users/followers/:id
router.get("/followers/:id", async (req: Request, res: Response) => {
    const id = req.params.id; 

    let followers: User[] = await User.findAll({
        include: [
            {
                model: Follower,
                required: true,
                where: { follower_id: id },
            },
        ],
    });

    return res.status(200).json({ data: followers, message: "", success: true });
});

// PATCH /api/users/:id/profile 
router.patch("/:user_id/profile", async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    try {
        const value = /*await userPatchSchema.validateAsync(req.body);*/ req.body;
        const foundUser = await User.findOne({where: {id: user_id}});
        if(!foundUser) return res.status(404).json({data: null, message: 'User not found!', success: false});
        
        const match = await bcrypt.compare(
            value.password,
            foundUser.password
        );

        if (!match)
            return res.status(400).json({data: null, message: 'Password invalid!', success: false});
         
        value.password = foundUser.password;

        await User.update(value, {where: {id: user_id}});
        return res.status(200).json({data: null, message: 'Successfully updated User!', success: true});

    } catch (error) {
        return res.status(400).json({data: null, message: error.details[0].message || error, success: false});
    }
});

// DELETE /api/users/notifications/:id
router.delete("/notifications/:id", async (req: Request, res: Response) => {
    const notifiId = req.params.id;
    await Notification.destroy({where: {id: notifiId, user_id: req.user!.id}});

    return res.status(200).json({data: null, message: 'Successfully deleted notifcation!', success: true});
});

// GET /api/users/:id/doodles
router.get("/:id/doodles", async (req: Request, res: Response) => {
    let userId = req.params.id;
    const attributes = ["username", "avatar", "id"];

    let doodles: Doodle[] = await Doodle.findAll({
        include: [
            {
                model: Comment,
                include: [{
                    model: User,
                    required: true,
                    attributes,
                    as: 'user'
                }],
                as: 'comments'
            },
            {
                model: User,
                required: true,
                where: { id: userId },
                attributes,
                as: "user"
            },
        ],
    });

    return res.status(200).json({ data: doodles, message: "", success: true });
});
