/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('transactions', table => {
    table.uuid('id').primary();
    table.decimal('amount', 15, 2).defaultTo(0.00);
    table.enu('type', ['credit', 'debit']);
    table.enu('status', ['pending', 'completed']).defaultTo('pending');
    table.string('description, 50');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('account_id').references('id').inTable('accounts').onDelete('CASCADE');
    table.string('reference, 50');
    table.date('transaction_date');
    table.timestamps(true, true);
    table.string('source, 50');
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('transactions')
}
