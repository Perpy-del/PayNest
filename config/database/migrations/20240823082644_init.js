/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.enu('status', ['active', 'inactive']).defaultTo('inactive');
    table.string('username, 50').notNullable();
    table.string('email, 50').notNullable();
    table.string('password, 50').notNullable();
    table.string('first_name, 50');
    table.string('last_name, 50');
    table.timestamps(true, true);
    // table.timestamp('created_at').defaultTo(knex.fn.now());
    // table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('users');
}
