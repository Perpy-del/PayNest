import type { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.decimal('amount', 15, 2).defaultTo(0.0)
    table.enu('type', ['credit', 'debit'])
    table.enu('status', ['pending', 'completed']).defaultTo('pending')
    table.string('description', 50)
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.bigInteger('account_id').references('id').inTable('accounts').onDelete('CASCADE')
    table.string('reference', 50)
    table.date('transaction_date')
    table.string('source', 50)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTable('transactions')
}
