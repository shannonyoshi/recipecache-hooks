const db = require("../data/dbConfig");

module.exports = {
  getUniqueUserTags,
  getTruncated,
  getFull,
  getStandardTags,
  //   add,
  //   remove,
  //   update,
};

//exported functions
async function getUniqueUserTags(userId) {
  let allUserTags = await getUserTags(userId);

  const uniqueTagSet = new Set();
  const uniqueTags = [];

  for (let index in allUserTags) {
    let currTag = allUserTags[index];
    if (!uniqueTagSet.has(currTag["text"])) {
      uniqueTags.push(currTag);
      uniqueTagSet.add(currTag["text"]);
    }
  }
  return uniqueTags;
}

async function getTruncated(userId) {
  let truncRecipes = await db("recipes").where({ user_id: userId });
  for (let index in truncRecipes) {
    const recipeId = truncRecipes[index]["id"];
    truncRecipes[index]["tags"] = await getRecipeTags(recipeId);
  }
  return truncRecipes;
}

async function getFull(recipeId) {
  let recipe = await db("recipes").where({ id: recipeId });
  recipe = recipe[0];
  // console.log('recipe', recipe)
  if (recipe) {
    const ingredients = await getIngredients(recipeId);
    // console.log('ingredients', ingredients)

    const instructions = await getInstructions(recipeId);
    //    console.log('instructions', instructions)

    const tags = await getRecipeTags(recipeId);
    // console.log('tags', tags)

    recipe["ingredients"] = ingredients;
    recipe["instructions"] = instructions;
    recipe["tags"] = tags;

    // console.log("recipeFull", recipe);
    return recipe;
  } else {
    return null;
  }
}

async function getStandardTags() {
  const standardTags = await db("tags")
    .where({ isCustom: false })
    .select("tags.text", "tags.id");
  return standardTags;
}

//helper functions

const getInstructions = async (recipeId) => {
  let instructions = await db("instructions")
    .join("recipes", "recipes.id", "instructions.recipe_id")
    .select("instructions.text", "instructions.order", "instructions.id")
    .where({ "instructions.recipe_id": recipeId });
  return instructions;
};

const getIngredients = async (recipeId) => {
  let ingredients = await db("ingredients")
    .join("recipes", "recipes.id", "ingredients.recipe_id")
    .select("ingredients.text", "ingredients.id")
    .where({ "ingredients.recipe_id": recipeId });
  return ingredients;
};

const getRecipeTags = async (recipeId) => {
  let tags = await db("tags_recipes")
    .join("tags", "tags.id", "tags_recipes.tag_id")
    .where({ "tags_recipes.recipe_id": recipeId })
    .select("tags.text", "tags.id");
  return tags;
};

const getUserTags = async (userId) => {
  let userTags = await db("tags_recipes")
    .join("tags", "tags.id", "tags_recipes.tag_id")
    .select("tags.text", "tags.isCustom", "tags.id")
    .where({ "tags_recipes.user_id": userId });
  return userTags;
};
