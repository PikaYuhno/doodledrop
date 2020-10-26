import Joi from "@hapi/joi";

// Only for testing
export const userPostSchema = Joi.object({
    username: Joi.string().max(15).min(3).required(),
    first_name: Joi.string().alphanum().max(15).min(3).required(),
    last_name: Joi.string().alphanum().max(15).min(3).required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    email: Joi.string().email().required(),
    pfp_pic_path: Joi.string(),
    bio: Joi.string(),
    location: Joi.string(),
});

export const userPatchSchema = Joi.object({
    username: Joi.string().max(15).min(3),
    first_name: Joi.string().alphanum().max(15).min(3),
    last_name: Joi.string().alphanum().max(15).min(3),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email(),
    pfp_pic_path: Joi.string(),
    bio: Joi.string(),
    location: Joi.string(),
});

export const userRegisterSchema = Joi.object({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
});

export const userLoginSchema = Joi.object({
    username: "",
    password: "",
});
