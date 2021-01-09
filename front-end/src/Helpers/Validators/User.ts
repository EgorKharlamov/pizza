import Joi from '@hapi/joi';

export const emailTooltip = 'Email';
export const passTooltip = '8-20 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (#?!@$%^&*-)';

export const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export const passSchema = Joi.object({
  pass: Joi.string()
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$'))
    .required(),
});

export const passWithRepeatSchema = Joi.object({
  pass: Joi.string()
    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$'))
    .required(),
  passRepeat: Joi.string()
    .required()
    .valid(Joi.ref('pass')),
});

export const phoneSchema = Joi.object({
  phone: Joi.string()
    // .length(18)
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/m)
    .required(),
});
