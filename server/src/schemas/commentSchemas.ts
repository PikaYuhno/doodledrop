import Joi from "@hapi/joi";

export const commentSchema = Joi.object({
    content: Joi.string().min(1).max(200).required(),
});

