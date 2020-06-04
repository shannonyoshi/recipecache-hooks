import React, { useEffect, useState } from "react";
import RecipeForm from "../components/recipeForm";
import Header from "../components/header";

import { fetchFullRecipe, fetchStandardTags } from "../util/recipeFuncs";

import "../styling/recipeFormView.scss";

const RecipeFormView = (props) => {
  console.log("recipeFormView props", props);
  const { setFullRecipe, fullRecipe, userTags, setUserStatus } = props;
  const [allTags, setAllTags] = useState([]);
  const page = props.match.path;
  // let recipe = null
  // let setRecipe=null
  // if (page === "/add") {
  //   recipe=props.addRecipe
  //   setRecipe = props.setAddRecipe
  // } else {
  //   recipe = props.fullRecipe,
  //   setRecipe=props.setFullRecipe
  // }
  const emptyFullRecipe = {
    id: null,
    title: "",
    source: "",
    notes: "",
    tags: [],
    ingredients: [
      { text: "", id: null },
      { text: "", id: null },
      { text: "", id: null },
    ],
    instructions: [
      { text: "", id: null, order: 1 },
      { text: "", id: null, order: 2 },
      { text: "", id: null, order: 3 },
    ],
  };
  useEffect(() => {
    if (allTags.length === 0) {
      const getStandardTags = async () => {
        const tags = await fetchStandardTags();
        console.log("tags", tags);
        if (tags) {
          const customUser = userTags.filter(
            (tag) => tag.isCustom !== 0 && tag.isCustom !== false
          );
          console.log("userTags", userTags);
          console.log("customUser", customUser);
          const mergedTags = [...tags, ...customUser];
          // console.log("mergedTags", mergedTags);
          const uniqueMergedTags = mergedTags.filter(
            (tag, index) =>
              mergedTags.indexOf(tag) === index && tag.text !== "All"
          );
          // console.log("uniqueMergedTags", uniqueMergedTags);
          setAllTags([...uniqueMergedTags]);
        }
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
      {}
      <Header setUserStatus={setUserStatus} />
      {page === "/add" ? <h1>Add Recipe</h1> : <h1>Edit Recipe</h1>}
      <RecipeForm
        fullRecipe={fullRecipe}
        setFullRecipe={setFullRecipe}
        allTags={allTags}
        setAllTags={setAllTags}
        page={page}
      />
    </div>
  );
};

export default RecipeFormView;
