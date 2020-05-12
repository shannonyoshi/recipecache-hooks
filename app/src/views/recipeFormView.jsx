import React, { useEffect, useState } from "react";
import RecipeForm from "../components/recipeForm";
import Header from "../components/header";

import { fetchFullRecipe, fetchStandardTags } from "../util/apiFunctions";

const RecipeFormView = (props) => {
  const { setFullRecipe, fullRecipe, emptyFullRecipe, userTags } = props;
  const [allTags, setAllTags] = useState([]);
  const page = props.match.path;
  useEffect(() => {
    if (allTags.length === 0) {
      const getStandardTags = async () => {
        const tags = await fetchStandardTags();
        const mergedTags = [...tags, ...userTags];
        const uniqueMergedTags = mergedTags.filter(
          (tag, index) =>
            mergedTags.indexOf(tag) === index && tag.text !== "All"
        );
        setAllTags([...uniqueMergedTags]);
      };
      getStandardTags();
    }
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
      <RecipeForm
        fullRecipe={fullRecipe}
        setFullRecipe={setFullRecipe}
        allTags={allTags}
        setAllTags={setAllTags}
      />
    </div>
  );
};

export default RecipeFormView;
