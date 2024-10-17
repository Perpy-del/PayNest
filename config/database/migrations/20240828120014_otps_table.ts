import type { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('otps', (table) => {
    table.uuid('id').primary()
    table.string('otp', 50).notNullable()
    table.string('email', 50).notNullable()
    table.boolean('is_used').defaultTo(false)
    table.datetime('expires_at')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTable('otps')
}
