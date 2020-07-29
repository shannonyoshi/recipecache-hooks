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
async function updateRecipe(currTags, recipeId, userId){
  //TODO: check this for post requests
  //prevTags = tags already associated with this recipe
  console.log('UPDATE RECIPE TAGS')
  const prevTags = await getRecipe(recipeId)
  console.log('prevTags', prevTags)
  let prevTagIds = prevTags.map(tag=> tag.id)
  console.log('prevTagIds', prevTagIds)
//new custom tags that need to be added to "tags" table, then the tags_recipes table
  let newTags = []
  //tags to be added to the "tags_recipes" table, but not "tags" table
  let tagsForTags_Rec = []
  for(let i=0; i< currTags.length; i++) {
    if (!currTags[i].id) { //assumes new custom tags do not have valid ID
      newTags.push(currTags[i])
      break
    }
    else if(prevTagIds.includes(currTags[i].id)){
      //removing IDs that are found in both lists from prevTagIds makes the final result of prevTagIds be tags that need to be removed
      prevTagIds=prevTagIds.filter(id=>id!==currTags[i].id)
      console.log('prevTagIds after filter', prevTagIds)
    }
    else{
      //finds tags that need to be added to "tags_recipes table"
      //if tag has an id and was not in previous tags
      tagsForTags_Rec.push(currTags[i].id)
    }
  }
  console.log('newTags', newTags)

  // returns [{tag_id:##}, {tag_id:##}], so concat after formatting other IDs
  let newTagIds = await createCustomTags(newTags)
  console.log('tagsForTags_Rec after concat', tagsForTags_Rec)
  formattedTags = []
  for(let i=0; i< tagsForTags_Rec.length; i++) {
    formattedTags.push({tag_id: tagsForTags_Rec[i]})
  }
  if (newTagIds) {
    console.log('newTagIds', newTagIds)
    formattedTags= formattedTags.concat(newTagIds)
  }
  console.log('formattedTags', formattedTags)
  
  const preppedTags = prepForTagsRecipes(formattedTags, recipeId, userId)
  console.log('preppedTags', preppedTags)
  const added = await addToTagsRecipes(preppedTags)
  console.log('added', added)
  if (prevTagIds.length>0) {
    const removed =  await removeTagFromRecipe(prevTagIds, recipeId)
    console.log('removed', removed)
  }
  //These should be removed from "tags_recipes" list
  console.log('prevTagIds', prevTagIds)
  console.log('end updateTags function')
}

//EXPORTED: deletes tag from "tags" DB
async function delCustomTag(tagId) {
  const tag = db("tags").where({ id: tagId }).where({ isCustom: 1 });
  console.log("tag to delete", tag);
  //TODO: after testing query, delete tag
}

//HELPER: deletes tag from "tags_recipe" table
async function removeTagFromRecipe(tagIds, recipeId) {
  const deleted = await db("tags_recipes").where({"recipe_id": recipeId}).whereIn('tag_id',tagIds).del()
  console.log('deleted from removeTagFromRecipe',deleted)
  return deleted
}

//HELPER: adds tags to a "tags_recipes" table
async function addToTagsRecipes(tags) {
  console.log('tags ADDING TO "tags_recipes', tags)
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