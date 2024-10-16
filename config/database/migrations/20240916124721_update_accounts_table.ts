import type { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.dropTable('transactions')
  await knex.schema.dropTable('accounts')
  return knex.schema.createTable('accounts', (table) => {
    table
      .bigInteger('id')
      .primary()
      .defaultTo(knex.raw('FLOOR(1000000000 + RANDOM() * 9000000000)'))
    table.uuid('user_id').references('id').inTable('users')
    table.decimal('balance', 15, 2).notNullable().defaultTo(0.0)
    table.boolean('is_default').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('accounts')
}
