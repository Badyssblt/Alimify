import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Foods extends BaseSchema {
  protected tableName = 'foods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('course_id').unsigned().references('id').inTable('courses').onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('description')
      table.string('image')
      table.integer('calory').unsigned()
      table.string('nutri_score', 1)
      table.integer('quantity').unsigned()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
