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
  console.log("instructions in addInstructions", instructions);
  const instArray = Helper.addProperty(instructions, "recipe_id", recipeId);
  console.log("instArray in addInstructions", instArray);
  try {
    const response = await db("instructions").insert(instArray);
    // console.log("addInstruction response", response);
    return true;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function updateIngredients(ingredients, recipeId) {
  let addResp = null;
  let prevIngrs = await getIngredients(recipeId);
  //filter to catch new ingredients to add to table
  const newIngr = ingredients.filter((ingredient) => !ingredient.id);
  //if there are new ingredients, they are added here
  if (newIngr.length > 0) {
    addResp = await addIngredients(newIngr, recipeId);
    // console.log("ingredients addResp", addResp);
  } else {
    //if there are not new ingredients to added
    addResp = true;
  }

  //incoming ingredients that are not new
  let notNewIngrs = ingredients.filter((ingredient) => ingredient.id);
  let changedIngr = [];
  if (prevIngrs) {
    for (let i = 0; i < notNewIngrs.length; i++) {
      let currIngr = notNewIngrs[i];
      for (let j = 0; j < prevIngrs.length; j++) {
        let prevIngr = prevIngrs[j];
        if (currIngr.id === prevIngr.id) {
          if (!currIngr.text === prevIngr.text) {
            // this means no change happened for this ingredient
            changedIngr.push(currIngr);
          }
          //this makes it so prevIngrs will be ingredients to delete
          prevIngrs.splice(j, 1);
          j--;
        }
      }
    }
    if (prevIngrs.length > 0) {
      delIngredients(prevIngrs, recipeId);
    }
  } else {
    //makes it so even if unable to access previously submitted ingredients, it will still update the available ones, but won't delete ingredients that were removed by user
    changedIngr = notNewIngrs;
  }
  let updateResp = null;
  if (changedIngr.length > 0) {
    //not sure if this prep is necessary for updating existing
    const prepped = Helper.addProperty(changedIngr, "recipe_id", recipeId);
    // console.log("prepped to Update", prepped);
    updateResp = await batchUpdate("ingredients", prepped);
    // console.log("updateResp", updateResp);
    // console.log("newIngr, addResp", newIngr, addResp);
  } else {
    updateResp = true;
  }
  // console.log("updateResp, addResp", updateResp, addResp);

  if (updateResp && addResp) {
    return true;
  } else {
    return false;
  }
}

async function updateInstructions(instructions, recipeId) {
  console.log("UPDATE INSTRUCTIONS", instructions);
  let prevInsts = await getInstructions(recipeId);
  let addResp = null;
  //filter to catch new instructions to add to table
  const newInsts = instructions.filter((instruction) => !instruction.id);
  if (newInsts.length > 0) {
    addResp = await addInstructions(newInsts, recipeId);
    console.log("addResp instructions", addResp);
  } else {
    addResp = true;
  }

  //filter to catch instructions which may need to be updated
  const notNewInsts = instructions.filter((instruction) => instruction.id);
  let changedInsts = [];
  if (prevInsts) {
    for (let i = 0; i < notNewInsts.length; i++) {
      let currInst = notNewInsts[i];
      for (let j = 0; j < prevInsts.length; j++) {
        let prevInst = prevInsts[j];
        if (currInst.id == prevInst.id) {
          if (
            currInst.text !== prevInst.text ||
            currInst.order !== prevInst.order
          ) {
            changedInsts.push(currInst);
          }
          prevInsts.splice(j, 1);
          j--;
        }
      }
    }
    if (prevInsts.length > 0) {
      console.log("prevInsts to delete", prevInsts);
      delInstructions(prevInsts, recipeId);
    }
  } else {
    changedInsts = notNewInsts;
  }
  let updateResp = null;
  if (changedInsts.length > 0) {
    updateResp = await batchUpdate("instructions", changedInsts);
  } else {
    updateResp = true;
  }
  //this does not make note of faulty deletes
  if (updateResp && addResp) {
    return true;
  } else {
    return false;
  }
}

//might move this to helperFuncs
async function batchUpdate(tableName, updatedArray) {
  let response = [];
  for (let i = 0; i < updatedArray.length; i++) {
    let curr = updatedArray[i];
    try {
      let resp = await db(tableName).where({ id: curr.id }).update(curr);
      response.push(resp);
    } catch (e) {
      console.log("e", e);
      response.push(false);
    }
  }
  return response;
}

async function delIngredients(ingredients, recipeId) {
  let ingredientIds = ingredients.reduce((idArr, obj) => {
    idArr.push(obj.id);
    return idArr;
  });
  console.log("ingredientIds to delete", ingredientIds);
  const deleted = await removeItems("ingredients", recipeId, ingredientIds);
  return deleted;
}

async function delInstructions(instructions, recipeId) {
  console.log("instructions to delete", instructions);
  let instructionIds = instructions.reduce((idArr, obj) => {
    idArr.push(obj.id);
    return idArr;
  });
  console.log("instructionIds to delete", instructionIds);
  const deleted = await removeItems("instructions", recipeId, instructionIds);
  return deleted;
}

//toDelete should be array of IDs to be deleted
async function removeItems(tableName, recipeId, toDelete) {
  try {
    const deleted = await db(tableName)
      .where({ recipe_id: recipeId })
      .whereIn("id", toDelete)
      .del();
    return deleted;
  } catch (e) {
    console.log("e", e);
    return null;
  }
}
