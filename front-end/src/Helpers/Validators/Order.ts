import Joi from '@hapi/joi';

export const streetSchema = Joi.object({
  street: Joi.string()
    .min(1)
    .required(),
});
export const buildingSchema = Joi.object({
  building: Joi.string()
    .min(1)
    .required(),
});
export const roomSchema = Joi.object({
  room: Joi.string()
    .min(1)
    .required(),
});
