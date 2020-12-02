import express, {Request, Response} from "express";
import cors from "cors";
import {createConnection, sequelize} from "./db/connection";
import {router as userRouter} from "./api/user/";
import {router as authRouter} from "./api/auth";
import {router as doodleRouter} from "./api/doodles";
import {verifyToken} from "./utils/verifyToken";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/users", verifyToken, userRouter);
app.use("/api/doodles", verifyToken, doodleRouter);
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

testConnection().then(async () => {
    await sequelize.sync();
});
app.listen(PORT, () => console.log(`Starting Server on port: ${PORT}`));
