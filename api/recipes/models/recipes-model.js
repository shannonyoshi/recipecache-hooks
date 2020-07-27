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
    console.log('get recipe tags', tags)
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
  let recipeId = null;
  let response = {};
  try {
    recipeId = await Trunc.add(fullRecipe, userId);
  } catch (e) {
    console.log("e", e);
    return null
  }
    if (recipeId) {
    if (fullRecipe.ingredients) {
      response["ingredients"] = await InstIngr.addIngredients(
        fullRecipe.ingredients,
        recipeId
      );
    }
    if (fullRecipe.instructions) {
      response["instructions"] = await InstIngr.addInstructions(
        fullRecipe.instructions,
        recipeId
      );
    }
    if (fullRecipe.tags) {
      response["tags"] = await Tags.addRecipe(
        fullRecipe.tags,
        recipeId,
        userId
      );
    }
    console.log("response", response);
    return response
  }


  //   if (badResponses.length === 0) {
  //     res.status(201).json({ recipeId: recipeId });
  //   } else {
  //     res.status(500).json({
  //       message: "An Error occurred, here's what was saved",
  //       recipeId: recipeId,
  //     });
  //   }
  // } else {
  //   res.status(500).json({ message: "Something went wrong, please try again" });
  // }

}

async function updateFull(recipe) {
  // TODO: write this func
}


async function deleteFull(recipeId) {
  // TODO: write this func
}
