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
  const added = await Recipes.addFull(fullRecipe, userId);

  // const recipeId = await Recipes.addTruncRecipe(fullRecipe, userId);
  // if (recipeId) {
  //   let badResponses = [];
  //   //TODO: add bad responses and check them before sending response
  //   let response = {};
  //   if (fullRecipe.ingredients) {
  //     response["ingredients"] = await Recipes.addIngredients(
  //       fullRecipe.ingredients,
  //       recipeId
  //     );
  //     if (!response["ingredients"]) {
  //       badResponses.push("ingredients");
  //     }
  //   }
  //   if (fullRecipe.instructions) {
  //     response["instructions"] = await Recipes.addInstructions(
  //       fullRecipe.instructions,
  //       recipeId
  //     );
  //     if (!response["instructions"]) {
  //       badResponses.push("instructions");
  //     }
  //   }
  //   if (fullRecipe.tags) {
  //     response["tags"] = await Recipes.addTagsNewRecipe(
  //       fullRecipe.tags,
  //       recipeId,
  //       userId
  //     );
  //     if (!response["tags"]) {
  //       badResponses.push("tags");
  //     }
  //   }
  //   console.log("response", response);
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
});

router.put("/", async (req, res) => {
  // console.log("req", req);
  console.log("UPDATE req.session", req.session);
  const fullRecipe = req.body;
  console.log("fullRecipe", fullRecipe);

  const recipe = await Recipes.updateTruncRecipe(fullRecipe);
  console.log("recipe", recipe);
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
