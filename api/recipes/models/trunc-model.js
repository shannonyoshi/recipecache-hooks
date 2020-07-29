const db = require("../../data/dbConfig");
const Tags = require("./tags-model")

module.exports = {
  getByUser,
  get,
  add,
  del,
  update,
};

async function getByUser(userId) {
  console.log("getTruncated userId", userId);
  try {
    let truncRecipes = await db("recipes").where({ user_id: userId });
    console.log('truncRecipes in trunc model', truncRecipes)
    for (let index in truncRecipes) {
      const recipeId = truncRecipes[index]["id"];
      truncRecipes[index]["tags"] = await Tags.getRecipe(recipeId);
    }
    return truncRecipes;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function get(recipeId) {
  try {
    let trunc = await db("recipes").where({ id: recipeId });
    return trunc[0];
  } catch (e) {
    console.log("e", e);
    return null;
  }
}

async function add(fullRecipe, userId) {
  const truncRecipe = {
    user_id: userId,
    title: fullRecipe.title,
    source: fullRecipe.source,
    notes: fullRecipe.notes,
  };
  try {
    let recipeId = await db("recipes").insert(truncRecipe, "id");
    return recipeId[0];
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function update(fullRecipe) {
  const truncChanges = {
    title: fullRecipe.title,
    source: fullRecipe.source,
    notes: fullRecipe.notes,
  };
  try {
    await db("recipes").where({ id: fullRecipe.id }).update(truncChanges);
    return true
  } catch (e) {
    console.log("e", e);
    return null;
  }
}

async function del(recipeId) {
  const response = await db("recipes").where({ id: recipeId }).del();
  console.log("delete response", response);
}
