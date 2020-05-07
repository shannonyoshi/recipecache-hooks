import React, { useEffect } from "react";
import RecipeForm from "../components/recipeForm";
import Header from "../components/header";

import { fetchFullRecipe } from "../util/apiFunctions";

const RecipeFormView = (props) => {
  console.log("Recipe Form View props", props);
  const { setFullRecipe, fullRecipe } = props;
  const page = props.match.path;

  useEffect(() => {
    if (!page == "/add") {
      const recipeId = props.match.params;
      const fetchRecipe = async () => {
        let recipe = await fetchFullRecipe(recipeId);
        setFullRecipe(recipe);
      };
    }
  }, [page]);

  console.log("page", page);
  return (
    <div>
      <Header />
      <h1>Recipe Form View</h1>
      <RecipeForm fullRecipe={fullRecipe} setFullRecipe={setFullRecipe} />
    </div>
  );
};

export default RecipeFormView;
