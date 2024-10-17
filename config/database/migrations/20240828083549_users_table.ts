import type { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.enu('status', ['active', 'inactive']).defaultTo('active')
    table.string('username', 255).notNullable().unique()
    table.string('email', 255).notNullable().unique()
    table.string('password', 255).notNullable()
    table.string('first_name', 255)
    table.string('last_name', 255)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}
