import Joi from "@hapi/joi";

export const doodlePostSchema = Joi.object({
    user_id: Joi.number().required(),
    image_path: Joi.string().required(),
});
