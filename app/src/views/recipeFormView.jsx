import React, { useEffect, useState } from "react";
import RecipeForm from "../components/recipeForm";
import Header from "../components/header";

import { fetchFullRecipe } from "../util/apiFunctions";

const RecipeFormView = (props) => {
  // console.log("Recipe Form View props", props);
  const { setFullRecipe, fullRecipe, emptyFullRecipe } = props;
  const page = props.match.path;
  useEffect(() => {
    if (page === "/add") {
      setFullRecipe(emptyFullRecipe);
    } else {
      const recipeId = props.match.params.id;
      if (fullRecipe.id !== recipeId) {
        const fetchRecipe = async (recipeId) => {
          let recipe = await fetchFullRecipe(recipeId);
          setFullRecipe(recipe);
        };
        fetchRecipe(recipeId);
      }
    }
  }, [page]);

  return (
    <div>
      <Header />
      <h1>Recipe Form View</h1>
      <RecipeForm fullRecipe={fullRecipe} setFullRecipe={setFullRecipe} />
    </div>
  );
};

export default RecipeFormView;
