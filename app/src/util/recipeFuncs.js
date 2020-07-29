const URL = "http://localhost:3000";

export const sortInstructions = (instructions) => {
  instructions.sort((a, b) => (a.order > b.order ? 1 : -1));
  // console.log("sortInstructions instructions", instructions);
};

export const fetchTruncRecipes = async () => {
  const response = await fetch(`${URL}/api/recipes/trunc`);
  let data = await response.json();
  // console.log("data", data);
  if (!response.ok) {
    console.log("bad response", response);
    return;
  } else {
    return data.truncatedRecipes;
  }
};

export const fetchFullRecipe = async (recipeId) => {
  // console.log("apiFunctions RecipeId", recipeId);
  try {
    const response = await fetch(`${URL}/api/full-recipes/${recipeId}`);
    const jsonResponse = await response.json();
    // console.log("jsonResponse", jsonResponse);
    if (!response.ok) {
      console.log("bad response", response);
    } else {
      return jsonResponse.recipe;
    }
  } catch (e) {
    console.log("e", e);
  }
};

export const postPutRecipe = async (recipe) => {
  // console.log(recipe);
  const jsonRecipe = JSON.stringify(recipe);
  // console.log("jsonRecipe", jsonRecipe);
  if (recipe.id) {
    console.log('put recipe', recipe)
    try {
      const response = await fetch(`${URL}/api/full-recipes/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: jsonRecipe,
      });
      console.log("put response", response);
    } catch (e) {
      console.log("e", e);
    }
  } else {
    console.log('post recipe', recipe)
    try {
      const response = await fetch(`${URL}/api/full-recipes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonRecipe,
      });
      console.log("response", response);
    } catch (e) {
      console.log("e", e);
    }
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const response = await fetch(`${URL}/api/recipes/full/${recipeId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    }
    console.log("response", response);
  } catch (e) {
    console.log("delete recipe e", e);
    return null;
  }
};
