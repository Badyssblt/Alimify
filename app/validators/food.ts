import vine from '@vinejs/vine'

export const createFoodValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).nullable(false)
  })
)
