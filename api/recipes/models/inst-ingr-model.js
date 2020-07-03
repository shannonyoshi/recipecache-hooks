const db = require("../../data/dbConfig");
const Helper = require("../helperFuncs");

module.exports = {
  getIngredients,
  getInstructions,
  addIngredients,
  addInstructions,
  updateIngredients,
  updateInstructions,
};

async function getInstructions(recipeId) {
  try {
    let instructions = await db("instructions")
      .join("recipes", "recipes.id", "instructions.recipe_id")
      .select("instructions.text", "instructions.order", "instructions.id")
      .where({ "instructions.recipe_id": recipeId });
    return instructions;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function getIngredients(recipeId) {
  try {
    let ingredients = await db("ingredients")
      .join("recipes", "recipes.id", "ingredients.recipe_id")
      .select("ingredients.text", "ingredients.id")
      .where({ "ingredients.recipe_id": recipeId });
    return ingredients;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

//ingredients do not have recipeId added yet
async function addIngredients(ingredients, recipeId) {
  const ingArray = Helper.addProperty(ingredients, "recipe_id", recipeId);
  try {
    const response = await db("ingredients").insert(ingArray);
    console.log("addIngredient response", response);
    return response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

//instructions do not have recipeId added yet
async function addInstructions(instructions, recipeId) {
  const instArray = Helper.addProperty(instructions, "recipe_id", recipeId);
  try {
    const response = await db("instructions").insert(instArray);
    console.log("addInstruction response", response);
    return response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function updateIngredients(ingredients) {
  // TODO: write this func
  //check if ingredient has ID
  //if so, update the ingredient
  // else, add the ingredient
}

async function updateInstructions(instructions) {
  // TODO: write this func
  //check if instructions has ID
  //if so, update the instructions
  // else, add the instructions
}
