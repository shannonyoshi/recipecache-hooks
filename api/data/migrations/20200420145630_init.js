exports.up = async function (knex) {
  await knex.schema.createTable("users", (user) => {
    user.increments();
    user.string("email").notNullable().unique();
    user.string("password").notNullable();
  });
  await knex.schema.createTable("recipes", (recipe) => {
    recipe.increments();
    recipe
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    recipe.string("title").notNullable();
    recipe.string("source");
    recipe.string("notes");
  });
  await knex.schema.createTable("ingredients", (ingredient) => {
    ingredient.increments();
    ingredient
      .integer("recipe_id")
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    ingredient.string("text").notNullable();
  });
  await knex.schema.createTable("instructions", (instruction) => {
    instruction.increments();
    instruction
      .integer("recipe_id")
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    instruction.integer("order").notNullable();
    instruction.string("text").notNullable();
  });
  await knex.schema.createTable("tags", (tag) => {
    tag.increments();
    tag.string("text");
    tag.boolean("isCustom");
  });
  await knex.schema.createTable("tags_recipes", (tag_recipe) => {
    tag_recipe.increments();
    tag_recipe
      .integer("tag_id")
      .notNullable()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tag_recipe
      .integer("recipe_id")
      .notNullable()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tag_recipe
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tags_recipes")
    .dropTableIfExists("tags")
    .dropTableIfExists("instructions")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};
