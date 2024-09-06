/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.table('accounts', table => {
    table.boolean('is_default').defaultTo(false).alter();
    table.decimal('balance', 10, 2).notNullable().defaultTo(0.0);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.table('accounts', table => {
    table.dropColumn('is_default');
  });
}
