
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {id: 1, recipe_id: 1, order: 1, text: "wash potato"},
        {id: 2, recipe_id: 1, order: 2, text: "boil potato"},
        {id: 3, recipe_id: 1, order: 3, text: "eat potato"},
        {id: 4, recipe_id: 2, order: 1, text: "wash potato"},
        {id: 5, recipe_id: 2, order: 2, text: "boil potato"},
        {id: 6, recipe_id: 2, order: 3, text: "eat potato"},
        {id: 7, recipe_id: 3, order: 1, text: "wash potato"},
        {id: 8, recipe_id: 3, order: 2, text: "boil potato"},
        {id: 9, recipe_id: 3, order: 3, text: "eat potato"},
        {id: 10, recipe_id: 4, order: 1, text: "wash potato"},
        {id: 11, recipe_id: 4, order: 2, text: "boil potato"},
        {id: 12, recipe_id: 4, order: 3, text: "eat potato"},
        {id: 13, recipe_id: 5, order: 1, text: "wash potato"},
        {id: 14, recipe_id: 5, order: 2, text: "boil potato"},
        {id: 15, recipe_id: 5, order: 3, text: "eat potato"},
        {id: 16, recipe_id: 6, order: 1, text: "wash potato"},
        {id: 17, recipe_id: 6, order: 2, text: "boil potato"},
        {id: 18, recipe_id: 6, order: 3, text: "eat potato"},
        {id: 19, recipe_id: 7, order: 1, text: "wash potato"},
        {id: 20, recipe_id: 7, order: 2, text: "boil potato"},
        {id: 21, recipe_id: 7, order: 3, text: "eat potato"},
        {id: 22, recipe_id: 8, order: 1, text: "wash potato"},
        {id: 23, recipe_id: 8, order: 2, text: "boil potato"},
        {id: 24, recipe_id: 8, order: 3, text: "eat potato"},
        {id: 25, recipe_id: 9, order: 1, text: "wash potato"},
        {id: 26, recipe_id: 9, order: 2, text: "boil potato"},
        {id: 27, recipe_id: 9, order: 3, text: "eat potato"}
      ]);
    });
};
