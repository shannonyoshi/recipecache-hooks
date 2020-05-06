import React from "react";

const URL = "http://localhost:8080";

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
  console.log("response", response);
  if (!response.ok) {
    console.log("bad response", response);
  } else {
    return response.data;
  }
};

export const fetchUserTags = async () => {
  const response = await fetch(`${URL}/api/recipes/userTags/1`);
  const jsonResponse = await response.json();
  console.log("jsonResponse", jsonResponse);
  if (!response.ok) {
    console.log("bad response", response);
  } else {
    return jsonResponse.userTags;
  }
};

// TODO: Functions to write: fetchUsedTags, fetchStandardTags, fetchFullRecipe
