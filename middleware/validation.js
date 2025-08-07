const Joi = require('joi');

const billSchema = Joi.object({
    pos_ie_billid: Joi.number().integer().required(),
    items: Joi.array().items(
        Joi.object({
            pos_ie_itemid: Joi.number().integer().required(),
            pos_ie_quantity: Joi.number().integer().required(),
            pos_ie_price: Joi.number().integer().required(),
            pos_ie_amount: Joi.number().integer().required()
        })
    ).required()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(1).required(),
})

module.exports = {
    billSchema,
    loginSchema
};