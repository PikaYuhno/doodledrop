import express, { Request, Response } from "express";
import cors from "cors";
import { createConnection } from "./db/connection";
import { router as userRouter } from "./api/user/";
import { router as authRouter } from "./api/auth";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

const testConnection = async () => {
    let retires = 5;
    while (retires != 0) {
        try {
            createConnection();
            break;
        } catch (error) {
            console.error(error);
            retires--;
            await new Promise((res, rej) => setTimeout(res, 2000));
        }
    }
};

testConnection();
app.listen(PORT, () => console.log(`Starting Server on port: ${PORT}`));
