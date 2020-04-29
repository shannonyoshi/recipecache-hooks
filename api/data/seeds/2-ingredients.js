
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {id: 1, recipe_id: 1 , "text": "1 potato"},
        {id: 2, recipe_id: 1, "text": "1 potato"},
        {id: 3, recipe_id: 1, "text": "1 potato"},
        {id: 4, recipe_id: 2, "text": "1 potato"},
        {id: 5, recipe_id: 2, "text": "1 potato"},
        {id: 6, recipe_id: 2, "text": "1 potato"},
        {id: 7, recipe_id: 3, "text": "1 potato"},
        {id: 8, recipe_id: 3, "text": "1 potato"},
        {id: 9, recipe_id: 3, "text": "1 potato"},
        {id: 10, recipe_id: 4, "text": "1 potato"},
        {id: 11, recipe_id: 4, "text": "1 potato"},
        {id: 12, recipe_id: 4, "text": "1 potato"},
        {id: 13, recipe_id: 5, "text": "1 potato"},
        {id: 14, recipe_id: 5, "text": "1 potato"},
        {id: 15, recipe_id: 5, "text": "1 potato"},
        {id: 16, recipe_id: 6, "text": "1 potato"},
        {id: 17, recipe_id: 6, "text": "1 potato"},
        {id: 18, recipe_id: 6, "text": "1 potato"},
        {id: 19, recipe_id: 7, "text": "1 potato"},
        {id: 20, recipe_id: 7, "text": "1 potato"},
        {id: 21, recipe_id: 7, "text": "1 potato"},
        {id: 22, recipe_id: 8, "text": "1 potato"},
        {id: 23, recipe_id: 8, "text": "1 potato"},
        {id: 24, recipe_id: 8, "text": "1 potato"},
        {id: 25, recipe_id: 9, "text": "1 potato"},
        {id: 26, recipe_id: 9, "text": "1 potato"},
        {id: 27, recipe_id: 9, "text": "1 potato"}
      ]);
    });
};
