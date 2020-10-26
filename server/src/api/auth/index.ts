import { Request, Response, Router } from "express";
import User from "../../db/models/User";
export const router = Router();
import { userLoginSchema } from "../../schemas/";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

router.post("/login", async (req: Request, res: Response) => {
    let body = req.body;
    try {
        const value = await userLoginSchema.validateAsync(body);
        let foundUser: User | null = await User.findOne({
            where: { username: value.username },
        });
        if (!foundUser)
            return res.status(400).json({
                data: null,
                message: "User not found!",
                success: false,
            });

        const match: boolean = await bcrypt.compare(
            value.password,
            foundUser.password
        );

        if (!match) {
            return res.status(400).json({
                data: null,
                message: "Password is wrong!",
                success: false,
            });
        }
        let token = jwt.sign(
            { id: foundUser.id, username: foundUser.username },
            process.env.SECRET!
        );
        console.log("token", token);
        return res.status(200).json({
            data: token,
            message: "Successfully logged in!",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            data: null,
            message: error.details[0].messaeg,
            success: false,
        });
    }
});

router.post("/register", async (req: Request, res: Response) => {});
