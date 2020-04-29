
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags_recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags_recipes').insert([
        {id: 1, tag_id: 1, recipe_id: 1, user_id: 1},
        {id: 2, tag_id: 2, recipe_id: 2, user_id: 1},
        {id: 3, tag_id: 3, recipe_id: 3, user_id: 1},
        {id: 4, tag_id: 4, recipe_id: 4, user_id: 2},
        {id: 5, tag_id: 5, recipe_id: 5, user_id: 2},
        {id: 6, tag_id: 6, recipe_id: 6, user_id: 2},
        {id: 7, tag_id: 7, recipe_id: 7, user_id: 3},
        {id: 8, tag_id: 8, recipe_id: 8, user_id: 3},
        {id: 9, tag_id: 9, recipe_id: 9, user_id: 3},
        {id: 10, tag_id: 2, recipe_id: 1, user_id: 1},
        {id: 11, tag_id: 3, recipe_id: 1, user_id: 1},
        {id: 12, tag_id: 3, recipe_id: 2, user_id: 1},
        {id: 13, tag_id: 4, recipe_id: 3, user_id: 1},
        {id: 14, tag_id: 5, recipe_id: 4, user_id: 2},
        {id: 15, tag_id: 6, recipe_id: 5, user_id: 2},
        {id: 16, tag_id: 7, recipe_id: 6, user_id: 2},
        {id: 17, tag_id: 8, recipe_id: 7, user_id: 3},
        {id: 18, tag_id: 9, recipe_id: 8, user_id: 3},
        {id: 19, tag_id: 1, recipe_id: 9, user_id: 3},
      ]);
    });
};
