import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).nullable(false),
    email: vine.string().email().nullable(false),
    password: vine.string().minLength(5).nullable(false)
  })
);

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().nullable(false),
    password: vine.string().minLength(5).nullable(false)
  })
)
