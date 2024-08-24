/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('otps', table => {
    table.uuid('id').primary();
    table.string('otp, 50').notNullable();
    table.string('phone_number, 50').notNullable();
    table.boolean('is_used').defaultTo(false);
    table.date('expires_at');
    table.timestamps(true, true);
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('otps');
}
