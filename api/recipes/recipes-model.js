const db = require("../data/dbConfig");

module.exports = {
  getUniqueUserTags,
  getTruncated,
  getFull,
  getStandardTags,
  addTruncRecipe,
  addIngredients,
  addInstructions,
  updateTruncRecipe,
  addTagsNewRecipe,

  //   add,
  //   remove,
  //   update,
};

// TODO: functions to write:
/*    
  updateRecipe:
  X  updateTruncRecipe,
    updateIngredient, 
    updateInstruction, 
    updateTag_Recipe,

  deleteRecipe:
    deleteTruncRecipe,
    deleteIngredient, 
    deleteInstruction
  
  deleteCustomTag,
  updateCustomTag
*/

//exported functions
async function getUniqueUserTags(userId) {
  console.log("getUniqueUserTags userId", userId);
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
  console.log("getTruncated userId", userId);
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
  if (recipe) {
    const ingredients = await getIngredients(recipeId);
    const instructions = await getInstructions(recipeId);
    const tags = await getRecipeTags(recipeId);
    recipe["ingredients"] = ingredients;
    recipe["instructions"] = instructions;
    recipe["tags"] = tags;
    return recipe;
  } else {
    return null;
  }
}

async function getStandardTags() {
  const standardTags = await db("tags")
    .where({ isCustom: false })
    .select("tags.text", "tags.id", "tags.isCustom");
  return standardTags;
}

async function addTruncRecipe(fullRecipe, userId) {
  let truncRecipe = {
    user_id: userId,
    title: fullRecipe.title,
    source: fullRecipe.source,
    notes: fullRecipe.notes,
  };
  let recipeId = await db("recipes").insert(truncRecipe, "id");
  console.log("recipeId in recipes-model", recipeId);
  return recipeId[0];
}
//ingredients do not have recipeId added yet
async function addIngredients(ingredients, recipeId) {
  const ingArray = addProperty(ingredients, "recipe_id", recipeId);
  const response = await db("ingredients").insert(ingArray);
  console.log("addIngredient response", response);
  return response;
}
//instructions do not have recipeId added yet
async function addInstructions(instructions, recipeId) {
  const instArray = addProperty(instructions, "recipe_id", recipeId);
  const response = await db("instructions").insert(instArray);
  console.log("addInstruction response", response);
  return response;
}

async function addTagsNewRecipe(allTags, recipeId, userId) {
  //tags that need to be added to "tags" DB
  const newCustomTags = allTags.filter((tag) => !tag.id);
  let tagIds = [];
  if (newCustomTags.length > 0) {
    tagIds = await createCustomTags(newCustomTags);
  }
  //tags that are already in "tags" DB
  const otherTags = allTags.filter((tag) => tag.id);
  for (let i = 0; i < otherTags.length; i++) {
    tagIds.push({ tag_id: otherTags[i].id });
  }
  const tagsWRecId = addProperty(tagIds, "recipe_id", recipeId);
  const preppedTags = addProperty(tagsWRecId, "user_id", userId);
  console.log("preppedTags", preppedTags);
  await addTagsRecipes(preppedTags);
}

async function updateTruncRecipe(fullRecipe) {
  let truncChanges = {
    title: fullRecipe.title,
    source: fullRecipe.source,
    notes: fullRecipe.notes,
  };
  return db("recipes").where({ id: fullRecipe.id }).update(truncChanges);
}

//helper functions

const addTagsRecipes = async (tags) => {
  await db("tags_recipes").insert(tags);
};

const createCustomTags = async (tags) => {
  const tagIds = [];
  for (let i = 0; i < tags.length; i++) {
    const id = await db("tags").insert({
      text: tags[i].text,
      isCustom: tags[i].isCustom,
    });
    tagIds.push({ tag_id: id[0] });
  }
  return tagIds;
};

const addProperty = (array, propertyName, propertyValue) => {
  const newArray = array.map((item) => ({
    ...item,
    [propertyName]: propertyValue,
  }));
  return newArray;
};

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
  console.log("getRecipeTags recipeId", recipeId);
  let tags = await db("tags_recipes")
    .join("tags", "tags.id", "tags_recipes.tag_id")
    .where({ "tags_recipes.recipe_id": recipeId })
    .select("tags.text", "tags.id", "tags.isCustom");
  return tags;
};

const getUserTags = async (userId) => {
  console.log("getUserTags userId", userId);
  let userTags = await db("tags_recipes")
    .join("tags", "tags.id", "tags_recipes.tag_id")
    .select("tags.text", "tags.isCustom", "tags.id")
    .where({ "tags_recipes.user_id": userId });
  return userTags;
};
