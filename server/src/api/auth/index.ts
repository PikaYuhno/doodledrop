import { Request, Response, Router } from "express";
import User from "../../db/models/User";
export const router = Router();
import { userLoginSchema, userRegisterSchema } from "../../schemas/userSchemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

router.post("/login", async (req: Request, res: Response) => {
    let body = req.body;
    try {
        // Check if the input is valid
        const value = await userLoginSchema.validateAsync(body);
        // Check if the user exists
        let foundUser: User | null = await User.findOne({
            where: { username: value.username },
        });
        if (!foundUser)
            return res.status(400).json({
                data: null,
                message: "User not found!",
                success: false,
            });

        // Compare the password
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
        // Generate JWT token
        let token = jwt.sign(
            { id: foundUser.id, username: foundUser.username },
            process.env.SECRET!,
            {expiresIn: '1h'}
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

router.post("/register", async (req: Request, res: Response) => {
    let body = req.body;

    try {
        // Check if the input is valid
        const value = await userRegisterSchema.validateAsync(body);
        // Check if the user doesn't already exist
        const count = await User.count({ where: { username: value.username } });
        if (count !== 0)
            return res.status(400).json({
                data: null,
                message: "User already exists!",
                success: false,
            });
        // Hash the password
        const hash = await bcrypt.hash(value.password, 10);
        value.password = hash;

        // Insert it to the database
        const createdUser = await User.create(value);

        return res.status(201).json({
            data: createdUser,
            message: "Successfully registered User!",
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
