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

export const fetchStandardTags = async () => {
  try {
    const response = await fetch(`${URL}/api/recipes/standardTags`);
    const jsonResponse = await response.json();
    return jsonResponse.standardTags;
  } catch (e) {
    console.log("e", e);
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

export const postPutRecipe = async (recipe) => {
  console.log(recipe);
  const jsonRecipe = JSON.stringify(recipe);
  console.log("jsonRecipe", jsonRecipe);
  try {
    const response = await fetch(`${URL}/api/recipes/add-or-edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonRecipe,
    });
  } catch (e) {
    console.log("e", e);
  }
};

export const postUser = async (user) => {
  const jsonUser = JSON.stringify(user);
  try {
    const response = await fetch(`${URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonUser,
    });
  } catch (e) {
    console.log("e", e);
  }
};

// TODO: Functions to write:
