const Joi = require('joi')

module.exports.SchemaJoi = Joi.object({
    user_email : Joi.string().required(),
    user_image : Joi.string().required(), 
    total_orders : Joi.number().required().min(0), 
    username : Joi.string().required(), 
    passoword : Joi.number()
})
