import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type JWTPayload = {
    id: number;
    username: string;
    iat: number;
};
declare module "express-serve-static-core" {
    export interface Request {
        user?: JWTPayload;
    }
}
export const verifyToken = (req: Request, res: Response, next: Function) => {
    let token: string = req.headers["authorization"] as string;
    if (!token)
        return res
            .status(401)
            .json({ data: null, message: "Please log in!", success: false });

    try {
        let decoded = jwt.verify(token, process.env.SECRET!);
        req.user = decoded as JWTPayload;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ data: null, message: error, success: false });
    }
};
