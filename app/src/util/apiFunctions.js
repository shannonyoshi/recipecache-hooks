const URL = "http://localhost:8080";

export const sortInstructions = (instructions) => {
  instructions.sort((a, b) => (a.order > b.order ? 1 : -1));
  console.log("sortInstructions instructions", instructions);
};

//for now userID is hard-coded as 1
export const fetchTruncRecipes = async () => {
  const response = await fetch(`${URL}/api/recipes/trunc/1`);
  let data = await response.json();
  // console.log("data", data);
  if (!response.ok) {
    console.log("bad response", response);
    return;
  } else {
    return data.truncatedRecipes;
  }
};

export const fetchUserState = async () => {
  const response = await fetch(`${URL}/api/auth/status`);
  // console.log("response", response);
  if (!response.ok) {
    console.log("bad response", response);
  } else {
    return response.data;
  }
};

export const fetchUserTags = async () => {
  const response = await fetch(`${URL}/api/recipes/userTags/1`);
  const jsonResponse = await response.json();
  // console.log("jsonResponse", jsonResponse);
  if (!response.ok) {
    console.log("bad response", response);
  } else {
    return jsonResponse.userTags;
  }
};

export const fetchFullRecipe = async (recipeId) => {
  console.log("apiFunctions RecipeId", recipeId);
  try {
    const response = await fetch(`${URL}/api/recipes/full/${recipeId}`);
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

// TODO: Functions to write: fetchStandardTags
