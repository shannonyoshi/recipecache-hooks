const db = require("../../data/dbConfig");
const Helper = require("../helperFuncs");

module.exports = {
  getUser,
  getStandard,
  addToRecipe,
  getRecipe,
  delTag,
};

//tags functions:
// get by recipe
// get by user
// get standard
// delete tag
// update tag
// add tags to recipe

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

async function addToRecipe(allTags, recipeId, userId) {
  //tags that need to be added to "tags" DB

  //TODO: figure out if this is necessary
  // const userTags = await getUniqueUserTags(userId)
  // let newCustomTags = []
  // for(let i=0; i< allTags.length; i++) {
  //   let currTag = allTags[i]
  //   if (currTag.id&& userTags.some(tag)=>tag.id===currTag.id)
  // newCustomTags.push(currTag)
  // }

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
  const tagsWRecId = Helper.addProperty(tagIds, "recipe_id", recipeId);
  const preppedTags = Helper.addProperty(tagsWRecId, "user_id", userId);
  console.log("preppedTags", preppedTags);
  const tagsResponse = await addTagsRecipes(preppedTags);
  console.log("tagsResponse", tagsResponse);
  return tagsResponse;
}

async function delCustomTag(tagId) {
  const tag = db("tags").where({ id: tagId }).where({ isCustom: 1 });
  console.log("tag to delete", tag);
  //TODO: after testing query, delete tag
}

async function addTagsRecipe(tags) {
  try {
    const response = await db("tags_recipes").insert(tags);
    return response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

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

async function delTag(tagId) {
  // TODO: write this function
}
