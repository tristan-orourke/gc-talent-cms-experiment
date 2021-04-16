
exports.up = async function(knex) {
  await knex.schema.createTable('job_posters', (table) => {
    table.increments();
    table.integer("salary");
    table.date("close_date");
  });

  await knex.schema.createTable('job_poster_translations', (table) => {
    table.increments();
    table.text("title");
    table.text("description");
    table.string("languages_code");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('job_posters');
  await knex.schema.dropTable('job_poster_translations');
};
