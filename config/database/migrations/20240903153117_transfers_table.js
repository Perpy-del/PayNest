/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('transfers', table => {
    table.uuid('id').primary();
    table
      .uuid('transaction_id')
      .references('id')
      .inTable('transfers')
      .onDelete('CASCADE'); // Foreign Key >> Transaction
    table.uuid('from_account_id');
    table.uuid('to_account_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('transfers');
}
