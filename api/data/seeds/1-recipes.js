
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, user_id: 1, title: "Potato Soup", source: "Bon Appetit", notes: "Potato Note"},
        {id: 2, user_id: 1, title: "Yam Soup", source: "Mom", notes: ""},
        {id: 3, user_id: 1, title: "Sweet Potato Soup", source: "Allrecipes", notes: ""},
        {id: 4, user_id: 2, title: "Tomato Soup", source: "Me", notes: ""},
        {id: 5, user_id: 2, title: "Beet Soup", source: "Some book", notes: "Beet Note"},
        {id: 6, user_id: 2, title: "Onion Soup", source: "", notes: ""},
        {id: 7, user_id: 3, title: "Brocoli Soup", source: "", notes: ""},
        {id: 8, user_id: 3, title: "Leek Soup", source: "", notes: ""},
        {id: 9, user_id: 3, title: "Chicken Noodle Soup", source: "Unknown", notes: "Chicken Note"}
      ]);
    });
};
