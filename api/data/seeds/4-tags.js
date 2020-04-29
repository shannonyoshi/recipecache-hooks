
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, text: 'Dinner', isCustom: false},
        {id: 2, text: 'Lunch', isCustom: false},
        {id: 3, text: 'Breakfast', isCustom: false},
        {id: 4, text: 'Vegetarian', isCustom: false},
        {id: 5, text: 'Side Dish', isCustom: false},
        {id: 6, text: 'Brunch', isCustom: false},
        {id: 7, text: 'Hearty', isCustom: true},
        {id: 8, text: 'Easy Clean', isCustom: true},
        {id: 9, text: 'Quick', isCustom: true},
        {id: 10, text: 'Drink', isCustom: false},
        {id: 11, text: 'Appetizer', isCustom: false},
        {id: 12, text: 'Snack', isCustom: false}
      ]);
    });
};
