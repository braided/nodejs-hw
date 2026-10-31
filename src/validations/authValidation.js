
import { celebrate, Joi, Segments } from 'celebrate';

// Валідація реєстрації
export const registerUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

// Валідація логіну
export const loginUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
