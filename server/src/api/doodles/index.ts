import { Request, Response, Router } from "express";
export const router = Router();
import Doodle from "../../db/models/Doodle";
import { doodlePostSchema } from "../../schemas/doodleSchemas";

// GET /api/doodles/
router.get("/", async (req: Request, res: Response) => {
    let doodles: Doodle[] = await Doodle.findAll();
    return res.status(200).json({ data: doodles, message: "", success: true });
});

// GET /api/doodles/:id
router.get("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    if (!id)
        return res
            .status(400)
            .json({ data: null, message: "ID not specified!", success: false });

    let doodle: Doodle | null = await Doodle.findOne({ where: { id } });
    if (!doodle)
        return res
            .status(404)
            .json({ data: null, message: "Doodle not found!", success: false });

    return res.status(200).json({
        data: doodle,
        message: "Successfully found doodle!",
        success: true,
    });
});

// POST /api/doodles/
router.post("/", async (req: Request, res: Response) => {
    let body = req.body;
    try {
        let value = await doodlePostSchema.validateAsync(body);
        const created: Doodle = await Doodle.create(value);
        return res.status(201).json({
            data: created,
            message: "Successfully created doodle!",
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

// PATCH /api/doodles/likes

// DELETE /api/doodles/:id
router.delete("/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    if (!id)
        return res
            .status(400)
            .json({ data: null, message: "ID not specified!", success: false });

    await Doodle.destroy({ where: { id } });
    return res.status(200).json({
        data: null,
        message: "Successfully deleted doodle!",
        success: true,
    });
});
