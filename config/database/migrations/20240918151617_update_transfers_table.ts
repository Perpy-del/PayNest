import type { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.dropTable('transfers')
  return knex.schema.createTable('transfers', (table) => {
    table.uuid('id').primary()
    table.uuid('transaction_id').references('id').inTable('transactions').onDelete('CASCADE') // Foreign Key >> Transaction
    table.bigInteger('from_account_id')
    table.bigInteger('to_account_id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTable('transfers')
}
