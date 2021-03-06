import Joi from "@hapi/joi";

export const doodlePostSchema = Joi.object({
    image_path: Joi.string().required(),
    title: Joi.string().max(20)
});
