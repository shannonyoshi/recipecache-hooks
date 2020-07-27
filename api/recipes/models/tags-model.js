const db = require("../../data/dbConfig");
const Helper = require("../helperFuncs");

module.exports = {
  getUser,
  getStandard,
  addRecipe,
  updateRecipe,
  getRecipe,
  delCustomTag,
  updateCustomTag
};

//EXPORTED: returns all tags used by specific user, removing any duplicates
async function getUser(userId) {
  console.log("getUniqueUserTags userId", userId);
  try {
    let allUserTags = await getAllUser(userId);
    const uniqueTagSet = new Set();
    const uniqueTags = [];

    for (let index in allUserTags) {
      let currTag = allUserTags[index];
      if (!uniqueTagSet.has(currTag["id"])) {
        uniqueTags.push(currTag);
        uniqueTagSet.add(currTag["id"]);
      }
    }
    return uniqueTags;
  } catch (e) {
    console.log("e", e);
  }
  return false;
}

//EXPORTED: returns array of non-custom tags
async function getStandard() {
  try {
    const standardTags = await db("tags")
      .where({ isCustom: false })
      .select("tags.text", "tags.id", "tags.isCustom");
    return standardTags;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
//EXPORTED: use with new recipes to create new custom tags, associate them with recipe/user
async function addRecipe(allTags, recipeId, userId) {
  //new custom tags to be added to "tags" DB
  const newCustomTags = allTags.filter((tag) => !tag.id);
  let tagIds = [];
  if (newCustomTags.length > 0) {
    //adding custom tags to DB
    tagIds = await createCustomTags(newCustomTags);
  }
  //completing the tag Ids array by adding tag IDs that already existed in "tags" DB
  for (let i = 0; i < allTags.length; i++) {
    if (allTags[i].id) {
      tagIds.push({ tag_id: allTags[i].id });
    }
  }
  // helper func that adds info in preparation for adding to "tags_recipes" table
  const preppedTags = prepForTagsRecipes(tagIds, recipeId, userId)
 
  //adds tags to "tags_recipes" DB
  const tagsResponse = await addToTagsRecipes(preppedTags);
  console.log("tagsResponse", tagsResponse);
  return tagsResponse;
}
//EXPORTED: use on recipe put requests
async function updateRecipe(tagsToUpdate, recipeId, userId){
  //TODO: complete this for post requests
  //currentTags = tags already associated with this recipe
  const currentTags = await getRecipe(recipeId)
  let currTagIds = currentTags.filter(tag=> tag.id)
//new custom tags that need to be added to tags table
  let tagsToCreate = []
  let tagsToAdd = []
  for(let i=0; i< tagsToUpdate.length; i++) {
    if (!tagsToUpdate[i].id) {
      tagsToCreate.push(tagsToUpdate[i])
    }
    else if(currentTagIds.includes(tagsToUpdate[i].id)){
      //removing IDs that are found in both lists makes the final result of currTagIds be tags that need to be removed
      currTagIds=currTagIds.filter(id=>id!=tagToUpdate[i].id)
    }
    else if (!currTagIds.includes(tagsToUpdate[i].id)) {
      //finds tags that need to be added to "tags_recipes table"
      tagsToAdd.push(tagsToUpdate[i].id)
    }
  }
  let newTagIds = await createCustomTags(tagsToCreate)
  if (newTagIds) {
    tagsToAdd= tagsToAdd.concat(newTagIds)
  }
  const preppedTags = prepForTagsRecipes(tagsToAdd, recipeId, userId)
  const added = addToTagsRecipe(preppedTags)
  if (currTagsIds.length>0) {
    const removed = removeTagFromRecipe(currTagsIds, recipeId)

  }
}

//EXPORTED: deletes tag from "tags" DB
async function delCustomTag(tagId) {
  const tag = db("tags").where({ id: tagId }).where({ isCustom: 1 });
  console.log("tag to delete", tag);
  //TODO: after testing query, delete tag
}

//HELPER: deletes tag from "tags_recipe" table
async function removeTagFromRecipe(tagIds, recipeId) {
  const tagsToDelete = await db("tags_recipes").where({recipeId}).whereIn('tag_id',tagIds)
//TODO: check that the query is functioning as expected, then add delete functionality
}

//HELPER: adds tags to a "tags_recipes" table
async function addToTagsRecipes(tags) {
  try {
    const response = await db("tags_recipes").insert(tags);
    return response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

//HELPER: preps tagIds to be added to "tags_recipes" table
function prepForTagsRecipes(tagIds, recipeId, userId) {
  const tagsWRecId = Helper.addProperty(tagIds, "recipe_id", recipeId);
  const preppedTags = Helper.addProperty(tagsWRecId, "user_id", userId);
  return preppedTags
}

//HELPER: adds array of custom tags to the "tags" table, returns array of tagIds
async function createCustomTags(tags) {
  const tagIds = [];
  for (let i = 0; i < tags.length; i++) {
    const id = await db("tags").insert({
      text: tags[i].text,
      isCustom: tags[i].isCustom,
    });
    tagIds.push({ tag_id: id[0] });
  }
  return tagIds;
}


//HELPER: returns all tags used by user, will probably contain multiples
async function getAllUser(userId) {
  console.log("getUserTags userId", userId);
  try {
    let userTags = await db("tags_recipes")
      .join("tags", "tags.id", "tags_recipes.tag_id")
      .select("tags.text", "tags.isCustom", "tags.id")
      .where({ "tags_recipes.user_id": userId });
    return userTags;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}


//EXPORTED: returns array of tags for an individual recipe by recipeId
async function getRecipe(recipeId) {
  console.log("getRecipeTags recipeId", recipeId);
  try {
    let tags = await db("tags_recipes")
      .join("tags", "tags.id", "tags_recipes.tag_id")
      .where({ "tags_recipes.recipe_id": recipeId })
      .select("tags.text", "tags.id", "tags.isCustom");
    return tags;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}


//updates name of custom tag
async function updateCustomTag(alteredTag) {
  await db("tags").where({id:alteredTag.id}).update({text:alteredTag.text})
}