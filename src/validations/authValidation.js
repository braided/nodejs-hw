import { Joi } from 'celebrate';

// Реєстрація користувача
export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// Вхід користувача
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Запит на відновлення паролю
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Встановлення нового паролю
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
