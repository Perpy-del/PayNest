/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('accounts', table => {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users');
    table.decimal('balance', 15, 2).notNullable().defaultTo(0.00);
    table.boolean('is_default').defaultTo(false);
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('accounts');
}
