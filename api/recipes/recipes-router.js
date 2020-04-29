const router = require("express").Router();
const Recipes = require("./recipes-model");

router.get("/full/:id", async (req, res) => {
  console.log("GET FULL RECIPE");
  const recipeID = req.params.id;
  console.log("recipeID", recipeID);
  try {
    const recipe = await Recipes.getFull(recipeID);
    console.log("recipe in GET", recipe);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "An error occurred while trying to retrieve recipe" });
  }
  if (recipe) {
    res.status(200).json({ recipe });
  } else {
    res.status(400).json({message: "Recipe not Found"})
  }
});

router.get("/all/:userId", async (req, res) => {
  const userID = req.params.userId;
  try {
    const truncatedRecipes = await Recipes.getTruncated(userID);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "An error occurred while trying to retrieve recipe" });
  }
  if (truncatedRecipes) {
    res.status(200).json({ truncatedRecipes });
  } else {
    res.status(400).json({message: "Recipes not Found"})
  }
});

module.exports = router;
