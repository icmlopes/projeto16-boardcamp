import joi from "joi";

export const customersSchema = joi.object({
  name: joi.string().min(1).required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().min(11).required(),
  birthday: joi.date(),
});
