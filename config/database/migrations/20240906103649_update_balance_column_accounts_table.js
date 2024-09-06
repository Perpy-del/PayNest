/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.table('accounts', table => {
    table.decimal('balance', 15, 2).notNullable().defaultTo(0.0).alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.table('accounts', table => {
    table.decimal('balance').alter();
  });
}
