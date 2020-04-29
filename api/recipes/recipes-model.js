const db = require("../data/dbConfig");

module.exports = {
  //   getTagsByUser,
  //   getTruncated,
  getFull,
  //   add,
  //   remove,
  //   update,
};

async function getTruncated(userId) {
  let truncRecipes = await db("recipes").where({ user_id: userId });
  let tagSet = new Set();
  truncRecipes.forEach((recipe) => {
    // let recipeTags = getRecipeTags(recipe.id)
    console.log("recipe", recipe);
  });
}

async function getFull(recipeId) {
  let recipe = await db("recipes").where({ id: recipeId });
  recipe = recipe[0];
  // console.log('recipe', recipe)
  if (recipe) {
    const ingredients = await db("ingredients")
      .join("recipes", "recipes.id", "ingredients.recipe_id")
      .select("ingredients.text")
      .where({ "ingredients.recipe_id": recipeId });
    // console.log('ingredients', ingredients)

    const instructions = await db("instructions")
      .join("recipes", "recipes.id", "instructions.recipe_id")
      .select("instructions.text", "instructions.order")
      .where({ "instructions.recipe_id": recipeId });
    // console.log('instructions', instructions)

    const tags = getRecipeTags(recipeId)
    // console.log('tags', tags)

    recipe["ingredients"] = ingredients;
    recipe["instructions"] = instructions;
    recipe["tags"] = tags;

    // console.log("recipeFull", recipe);
    return recipe

    } else {
        return null
  }
}


const getRecipeTags = async (recipeId)=> {
  let tags = await db("tags_recipes")
  .join("tags", "tags.id", "tags_recipes.tag_id")
  .where({ "tags_recipes.recipe_id": recipeId })
  .select("tags.text");
  return tags
}