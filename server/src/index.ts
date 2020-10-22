import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("bruh diga");
});

app.listen(PORT, () => console.log(`Starting Server on port: ${PORT}`));
