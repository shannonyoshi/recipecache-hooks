const router = require("express").Router();

const Recipes = require("./models/recipes-model");


/* Endpoints: 
      GET /:recipeId   gets full recipe
      POST /            posts full recipe
      PUT /             updates full recipe
      DELETE /:recipeId deletes full recipe
*/

router.get("/:recipeId", async (req, res) => {
  console.log("GET FULL RECIPE");
  const recipeId = req.params.recipeId;
  // console.log("recipeId", recipeId);
  let recipe = null;
  try {
    recipe = await Recipes.getFull(recipeId);
    // console.log("recipe in GET", recipe);
  } catch (error) {
    // console.log("error", error);
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

//empty fields are not submitted in the recipe, so checking if field is present ensures not trying to add nothing to db
router.post("/", async (req, res) => {
  console.log("ADD req.session", req.session);
  const userId = req.session.userId;
  const fullRecipe = req.body;
  console.log("fullRecipe", fullRecipe);
  const responseObj = await Recipes.addFull(fullRecipe, userId);
  if (responseObj){
    res.status(201).json({message: "Recipe added"})
  } else {   
     //trunc recipe not added
    res.status(500).json({message: "An error occurred when adding the recipe. Please try again"})

  }

  

});

router.put("/", async (req, res) => {
  // console.log("req", req);
  console.log("UPDATE req.session", req.session);
  const userId = req.session.userId
  const fullRecipe = req.body;
  console.log("fullRecipe", fullRecipe);
  try{
    const recipe = await Recipes.updateFull(fullRecipe, userId);
    console.log("recipe", recipe);
    res.status(200).json({recipe})
  } catch(e) {
    console.log('e', e)
    res.status(500).end()
  }
});

router.delete("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    let response = Recipes.delRecipe(recipeId);
    if (response) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.log("e", e);
  }
});

module.exports = router;
