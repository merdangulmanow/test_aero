import joi from 'joi'

export const signUpSchema= joi.object({
  id: joi.alternatives().try(joi.string().regex(/^123-[0-9]{8}$/).messages({'string.pattern.base': `Invalid phone number`}), joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net", "in", "co"]}})).required(),
  password: joi.string().min(5).max(30).required(),
})

export const paginateSchema= joi.object({
  list_size: joi.number().positive().optional(),
  page: joi.number().positive().optional()
})

export const idSchema= joi.object({
  id: joi.string().required()
})