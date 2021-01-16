import {Request, Response, Router} from "express";
export const router = Router();
import Doodle from "../../db/models/Doodle";
import User from "../../db/models/User";
import {doodlePostSchema} from "../../schemas/doodleSchemas";
import {commentSchema} from "../../schemas/commentSchemas";
import Comment from '../../db/models/Comment';
import Notification from "../../db/models/Notification";
import Follower from '../../db/models/Follower';


// PATCH /api/doodles/:id/comments/:c_id
router.patch("/:id/comments/:c_id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const cId = req.params.c_id;
    const body = req.body;
    const doodle: Doodle | null = await Doodle.findOne({where: {id}});
    if (!doodle) return res.status(404).json({data: null, message: 'Doodle not found!', success: false})
    try {
        const value = await commentSchema.validateAsync(body); 
        const updated = await Comment.update(value, {where: {id: cId, doodle_id: doodle.id}});
        return res.status(200).json({data: updated, message: 'Successfully updated comment!', success: true});
    } catch (error) {
        return res.status(400).json({data: null, message: error.details[0].message, success: false}); 
    }
});

// DELETE /api/doodles/:id/comments/:c_id
router.delete("/:id/comments/:c_id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const cId = req.params.c_id;
    const doodle: Doodle | null = await Doodle.findOne({where: {id}});
    if (!doodle) return res.status(404).json({data: null, message: 'Doodle not found!', success: false})

    const affectedRows: number = await Comment.destroy({where: {id: cId}});
    return res.status(200).json({data: null, message: affectedRows > 0 ? 'Successfully deleted Comment' : 'Comment not found', success: true});
});


// POST /api/doodles/:id/comments
router.post("/:id/comments", async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const doodle: Doodle | null = await Doodle.findOne({where: {id}});
    if (!doodle) return res.status(404).json({data: null, message: 'Doodle not found!', success: false})
    try {
        const value = await commentSchema.validateAsync(body); 
        const created = await Comment.create({doodle_id: doodle.id, user_id: req.user!.id, content: value.content, created_at: new Date()});
        Notification.create({user_id: req.user!.id, doodle_id: doodle.id, content: `${req.user!.username} commented on your doodle `})
        return res.status(200).json({data: created, message: 'Successfully created Comment!', success:true});
    } catch (error) {
        return res.status(400).json({data: null, message: error.details[0].message, success: false}); 
    }    
});

// GET /api/doodles/:id/comments
router.get("/:id/comments", async (req: Request, res: Response) => {
    const id = req.params.id;
    const count: number = await Doodle.count({where: {id}});
    if (count === 0) return res.status(404).json({data: null, message: 'Doodle not found!', success: false})
    const doodle: Doodle | null = await Doodle.findOne({
        where: {id}, include: [{
            model: Comment,
            required: true
        }]
    });
    if (!doodle) return res.status(404).json({data: [], message: 'No Comments', success: true});

    return res.status(200).json({data: doodle, message: 'Successfully found doodle!', success: true});
});

// GET /api/doodles/
router.get("/", async (req: Request, res: Response) => {
    const id = req.user!.id;
    const attributes = ["username", "avatar"];
    const allDoodles = !req.query.follower ? true : (req.query.follower !== 'true');

    let doodles: Doodle[] | User[] = [];
    console.log("All Doodles? ", allDoodles);

    if(allDoodles) {
         doodles = await Doodle.findAll({
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
                    attributes,
                    as: 'user'
                }
            ]
        });
    } else {
        doodles = await User.findAll({
            where: {"$Followers.follower_id$": id},
            include: [
                {
                    model: Follower,
                    required: true,
                },
                {
                    model: Doodle,
                }
            ],
        })
    }
    return res.status(200).json({data: doodles, message: "", success: true});
});

// GET /api/doodles/:id
router.get("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    if (!id)
        return res
            .status(400)
            .json({data: null, message: "ID not specified!", success: false});

    let doodle: Doodle | null = await Doodle.findOne({where: {id}});
    if (!doodle)
        return res
            .status(404)
            .json({data: null, message: "Doodle not found!", success: false});

    return res.status(200).json({
        data: doodle,
        message: "Successfully found doodle!",
        success: true,
    });
});

// POST /api/doodles/
router.post("/", async (req: Request, res: Response) => {
    let body = req.body;
    const id = req.user!.id;
    try {
        let value = await doodlePostSchema.validateAsync(body);
        value.user_id = id;
        const created: Doodle = await Doodle.create(value);
        return res.status(201).json({
            data: created,
            message: "Successfully created doodle!",
            success: true,
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            data: null,
            message: error.details[0].message || error,
            success: false,
        });
    }
});

// PATCH /api/doodles/:id/like
router.patch("/:id/like", async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user!.id;
    const doodle = await Doodle.findOne({where: {id}});
    likeOrDislike(userId, res, true, doodle, id);
});

// PATCH /api/doodles/:id/dislike
router.patch("/:id/dislike", async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user!.id;
    const doodle = await Doodle.findOne({where: {id}});
    likeOrDislike(userId, res, false, doodle, id);
});

const likeOrDislike = async (
    userId: number,
    res: Response,
    like: boolean,
    doodle: Doodle | null,
    id?: string
) => {
    if (!doodle)
        return res
            .status(404)
            .json({data: null, message: "Doodle not found!", success: false});
    if (
        like ? doodle.likes.includes(userId) : doodle.dislikes.includes(userId)
    ) {
        return res.status(400).json({
            data: null,
            message: `Doodle is already ${like ? "liked" : "disliked"}!`,
            success: false,
        });
    }

    let values = like
        ? {likes: [...doodle.likes, userId]}
        : {dislikes: doodle.dislikes.filter((el) => el !== userId)};
    const updated = await Doodle.update(values, {where: {id}});
    return res.status(200).json({
        data: updated,
        message: `Successfully ${like ? "liked" : "disliked"} doodle!`,
        success: true,
    });
};

// PATCH /api/doodles/comment/:id/like
router.patch("comment/:id/like", async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user!.id;
    const comment = await Comment.findOne({where: {id}});
    likeOrDislikeComment(userId, res, true, comment, id);
});

// PATCH /api/doodles/comment/:id/dislike
router.patch("/comment/:id/dislike", async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user!.id;
    const comment = await Comment.findOne({where: {id}});
    likeOrDislikeComment(userId, res, false, comment, id);
});

const likeOrDislikeComment = async (
    userId: number,
    res: Response,
    like: boolean,
    comment: Comment | null,
    id?: string
) => {
    if (!comment)
        return res
            .status(404)
            .json({data: null, message: "Comment not found!", success: false});
    if (
        like ? comment.likes.includes(userId) : comment.dislikes.includes(userId)
    ) {
        return res.status(400).json({
            data: null,
            message: `Comment is already ${like ? "liked" : "disliked"}!`,
            success: false,
        });
    }

    let values = like
        ? {likes: [...comment.likes, userId]}
        : {dislikes: comment.dislikes.filter((el) => el !== userId)};
    const updated = await Comment.update(values, {where: {id}});
    return res.status(200).json({
        data: updated,
        message: `Successfully ${like ? "liked" : "disliked"} comment!`,
        success: true,
    });
};


// DELETE /api/doodles/:id
router.delete("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    if (!id)
        return res
            .status(400)
            .json({data: null, message: "ID not specified!", success: false});

    await Doodle.destroy({where: {id}});
    return res.status(200).json({
        data: null,
        message: "Successfully deleted doodle!",
        success: true,
    });
});

// GET /api/doodles/user/:id
router.get("/user/:id", async (req: Request, res: Response) => {
    let userId = req.params.user;

    let doodles: Doodle[] = await Doodle.findAll({
            include: [
            {
                model: User,
                required: true,
                where: { user_id : userId },
            },
        ],
    });

    return res.status(200).json({ data: doodles, message: "", success: true });
});

