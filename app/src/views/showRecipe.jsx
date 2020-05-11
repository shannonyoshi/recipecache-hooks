import React, { useEffect } from "react";
import Header from "../components/header";
import FullRecipe from "../components/fullRecipe";

import { fetchFullRecipe, sortInstructions } from "../util/apiFunctions";

import "../styling/showRecipeView.scss";

const ShowRecipe = (props) => {
  const { setFullRecipe, fullRecipe } = props;
  const recipeId = props.match.params.id;
  console.log("showRecipe recipeId", recipeId);
  useEffect(() => {
    const fetchRecipe = async () => {
      let recipe = await fetchFullRecipe(recipeId);
      sortInstructions(recipe.instructions);
      setFullRecipe(recipe);
    };
    fetchRecipe();
  }, []);
  return (
    <div>
      <Header />
      <h1>ShowRecipe</h1>
      <FullRecipe fullRecipe={fullRecipe} />
    </div>
  );
};

export default ShowRecipe;
