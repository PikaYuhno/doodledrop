import express, { Request, Response } from "express";
import cors from "cors";
import { createConnection } from "./db/connection";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const testConnection = async () => {
    let retires = 5;
    while (retires != 0) {
        try {
            createConnection();
        } catch (error) {
            retires--;
            await new Promise((res, rej) => setTimeout(res, 2000));
        }
    }
};

const main = async () => {
    await testConnection();
    app.listen(PORT, () => console.log(`Starting Server on port: ${PORT}`));
};
