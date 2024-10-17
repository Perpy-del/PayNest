import type { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.table('accounts', (table) => {
    table.decimal('balance', 15, 2).notNullable().defaultTo(0.0).alter()
  })
}

export async function down(knex: Knex) {
  return knex.schema.table('accounts', (table) => {
    table.decimal('balance').alter()
  })
}
