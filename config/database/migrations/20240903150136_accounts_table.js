/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('accounts', table => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    table.uuid('user_id').references('id').inTable('users');
    table.decimal('balance', 15, 2).notNullable().defaultTo(0.0);
    table.boolean('is_default').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('accounts');
}
