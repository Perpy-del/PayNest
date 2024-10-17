import type { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.table('accounts', (table) => {
    table.boolean('is_default').defaultTo(false).alter()
    table.decimal('balance', 10, 2).notNullable().defaultTo(0.0).alter()
  })
}

export async function down(knex: Knex) {
  return knex.schema.table('accounts', (table) => {
    table.dropColumn('is_default')
  })
}
