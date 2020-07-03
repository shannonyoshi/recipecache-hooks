const db = require("../../data/dbConfig");
const InstIngr = require("./inst-ingr-model");
const Tags = require("./tags-model");
const Trunc = require("./trunc-model");
const Helper = require("../helperFuncs");

module.exports = {
  getFull,
  updateFull,
  deleteFull,
  addFull,
};

//TODO: ADD ERROR HANDLING

async function getFull(recipeId) {
  try {
    let recipe = await Trunc.get(recipeId);
    const ingredients = await InstIngr.getIngredients(recipeId);
    const instructions = await InstIngr.getInstructions(recipeId);
    const tags = await Tags.getRecipe(recipeId);
    recipe["ingredients"] = ingredients;
    recipe["instructions"] = instructions;
    recipe["tags"] = tags;
    return recipe;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function addFull(fullRecipe, userId) {
  const recipeId = null;
  try {
    recipeId = await Trunc.add(fullRecipe, userId);
  } catch (e) {
    console.log("e", e);
  }
  // TODO: find this func, already written, but was moved
}

async function updateFull(recipe) {
  // TODO: write this func
}


async function deleteFull(recipeId) {
  // TODO: write this func
}
