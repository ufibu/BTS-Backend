const Joi = require('joi');

const createChecklist = {
    body: Joi.object().keys({
        title: Joi.string().required(),
    }),
}

const createItem = {
    body: Joi.object().keys({
        itemName: Joi.string().required(),
    }),
}



module.exports = {
    createChecklist,
    createItem,
};