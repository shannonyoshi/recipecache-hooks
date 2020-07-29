import React, { useEffect } from "react";
import Header from "../components/header";
import FullRecipe from "../components/fullRecipe";

import { fetchFullRecipe, sortInstructions } from "../util/recipeFuncs";

import "../styling/showRecipeView.scss";

const ShowRecipeView = (props) => {
  const { setFullRecipe, fullRecipe, setUserStatus } = props;
  const recipeId = props.match.params.id;
  console.log("showRecipe recipeId", recipeId);
  useEffect(() => {
    const fetchRecipe = async () => {
      let recipe = await fetchFullRecipe(recipeId);
      if (recipe.instructions) {
        sortInstructions(recipe.instructions);
      }
      setFullRecipe(recipe);
    };
    fetchRecipe();
  }, []);
  return (
    <div>
      <Header setUserStatus={setUserStatus} />
      <h1>Show Recipe</h1>
      <FullRecipe fullRecipe={fullRecipe} />
    </div>
  );
};

export default ShowRecipeView;
