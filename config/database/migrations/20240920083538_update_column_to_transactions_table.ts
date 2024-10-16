import type { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema.table('transactions', (table) => {
    table.timestamp('transaction_date').alter()
  })
}

export function down(knex: Knex) {
  return knex.schema.table('transactions', (table) => table.date('transaction_date').alter())
}
