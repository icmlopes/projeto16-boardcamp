import joi from "joi";

export const customersSchema = joi.object({
  name: joi.string().min(1).required(),
  phone: joi
    .string()
    .pattern(/^([0-9]{10})?([0-9]{11})?$/)
    .required(),
  cpf: joi
    .string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  birthday: joi.date(),
});
