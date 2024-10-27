import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Course from '#models/course'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Food extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare image: string

  @column()
  declare calory: number

  @column()
  declare nutriScore: string

  @column()
  declare quantity: number

  @column()
  declare courseId: number

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
