import Joi from "joi";

const battleSchema = Joi.object({
    firstUser: Joi.string().required(),
    secondUser: Joi.string().required()
});

export default battleSchema;