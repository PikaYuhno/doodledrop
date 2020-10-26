import { Request, Response, Router } from "express";
export const router = Router();
import User from "../../db/models/User";
import { userPostSchema, userPatchSchema } from "../../schemas/";

// GET /api/users/
router.get("/", async (req: Request, res: Response) => {
    let users: User[] = await User.findAll();
    return res.status(200).json({ data: users, message: "", success: true });
});

// GET /api/users/:id
router.get("/:id", async (req: Request, res: Response) => {
    let userId = req.params.id;
    let user: User | null = await User.findOne({ where: { id: userId } });
    if (!user) {
        return res
            .status(404)
            .json({ data: null, message: "User not found!", success: false });
    }
    return res.status(200).json({
        data: user,
        message: "Successfully found Uesr!",
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
