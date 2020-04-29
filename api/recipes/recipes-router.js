const router = require("express").Router();
const Recipes = require("./recipes-model");

/* Endpoints: 
x      GET /full/:recipeId   gets 1 full recipe
x      GET /trunc/:userId    gets a list of truncated recipes for that user
x      GET /userTags/:userId  gets list of tags (including custom for that user)
x      GET /standardTags      gets list of standard tags
      POST /add              adds new recipe(truncated, ingredients, instructions, tags, tags_recipes)
      PUT /update            updates existing recipe
*/

router.get("/full/:recipeId", async (req, res) => {
  console.log("GET FULL RECIPE");
  const recipeId = req.params.recipeId;
  console.log("recipeId", recipeId);
  let recipe = null;
  try {
    recipe = await Recipes.getFull(recipeId);
    console.log("recipe in GET", recipe);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "An error occurred while trying to retrieve recipe" });
  }
  if (recipe) {
    res.status(200).json({ recipe });
  } else {
    res.status(400).json({ message: "Recipe not Found" });
  }
});

router.get("/trunc/:userId", async (req, res) => {
  const userId = req.params.userId;
  let truncatedRecipes = null
  try {
    truncatedRecipes = await Recipes.getTruncated(userId);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "An error occurred while trying to retrieve recipe" });
  }
  if (truncatedRecipes) {
    res.status(200).json({ truncatedRecipes });
  } else {
    res.status(400).json({ message: "Recipes not Found" });
  }
});

router.get("/userTags/:userId", async (req, res)=> {
  const userId = req.params.userId
  let userTags = null
  try{
    userTags = await Recipes.getUniqueUserTags(userId)
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "An error occurred while trying to retrieve user tags" });
  }
  if (userTags) {
    res.status(200).json({ userTags });
  } else {
    res.status(400).json({ message: "Tags not found" });
  }
})

router.get("/standardTags", async (req, res)=> {
  try{
  const standardTags = await Recipes.getStandardTags()
  res.status(200).json({standardTags})
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "An error occurred while trying to retrieve standard tags" });
  }
})

module.exports = router;
