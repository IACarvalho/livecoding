/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('comic_books', (table) => {
    table.uuid('id').notNullable()    
    table.text('title').notNullable()
    table.text('issue_number')
    table.text('writer').notNullable()
    table.text('artist').notNullable()
    table.text('publisher').notNullable()
    table.text('gender').notNullable()
    table.text('cover_image_url')
.notNullable  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('comic_books')
};
