import Joi from "@hapi/joi";

export const commentPostSchema = Joi.object({
    content: Joi.string().min(1).max(200).required(),
})
