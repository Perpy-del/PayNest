/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('otps', table => {
    table.uuid('id').primary();
    table.string('otp', 50).notNullable();
    table.string('email', 50).notNullable();
    table.boolean('is_used').defaultTo(false);
    table.datetime('expires_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('otps');
}
