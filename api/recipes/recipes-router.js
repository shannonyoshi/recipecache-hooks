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
//TODO: once redis is set up, update userId endpoints to use cookies instead of param
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

router.get("/trunc", async (req, res) => {
  const userId = req.session.userId;
  console.log("GET TRUNC req.session", req.session);
  let truncatedRecipes = null;
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

router.get("/userTags", async (req, res) => {
  console.log("USER TAGS req.session", req.session);
  const userId = req.session.userId;
  let userTags = null;
  try {
    userTags = await Recipes.getUniqueUserTags(userId);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "An error occurred while trying to retrieve user tags",
    });
  }
  if (userTags) {
    res.status(200).json({ userTags });
  } else {
    res.status(400).json({ message: "Tags not found" });
  }
});

router.get("/standardTags", async (req, res) => {
  try {
    const standardTags = await Recipes.getStandardTags();
    res.status(200).json({ standardTags });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "An error occurred while trying to retrieve standard tags",
    });
  }
});

router.post("/add", async (req, res) => {
  console.log("ADD req.session", req.session);
  const userId = req.session.userId;
  const fullRecipe = req.body;
  console.log("fullRecipe", fullRecipe);
  const recipeId = await Recipes.addTruncRecipe(fullRecipe, userId);
  // console.log("recipe id in add route", recipeId);
  if (recipeId) {
    const ingredients = fullRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      recipe_id: recipeId,
    }));
    // console.log("ingredients", ingredients);
    const ingIsAdded = await Recipes.addIngredients(ingredients);
    const instructions = fullRecipe.instructions.map((instruction) => ({
      ...instruction,
      recipe_id: recipeId,
    }));
    const instIsAdded = await Recipes.addInstructions(instructions);
  }
});

router.post("/edit", async (req, res) => {
  // console.log("req", req);
  console.log("UPDATE req.session", req.session);
  const fullRecipe = req.body;
  console.log("fullRecipe", fullRecipe);

  const recipe = await Recipes.updateTruncRecipe(fullRecipe);
  console.log("recipe", recipe);
});

module.exports = router;
