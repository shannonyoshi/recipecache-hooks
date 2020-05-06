import React, { useState, useEffect } from "react";
import RecipeCard from "./recipeCard";

const RecipeDashboard = (props) => {
  const { selectedTag, truncRecipes } = props;
  // console.log("Dashboard: selectedTag", selectedTag);
  console.log("Dashboard truncRecipes", truncRecipes);
  const [showRecipes, setShowRecipes] = useState([...truncRecipes]);
  useEffect(() => {
    console.log("useEffect");
    filterRecipes();
  }, [selectedTag, truncRecipes]);

  const filterRecipes = () => {
    console.log("Filter");
    console.log("selecteTag", selectedTag);
    if (selectedTag.text === "all") {
      setShowRecipes([...truncRecipes]);
    } else {
      console.log("Else: selectedTag", selectedTag);
    }
  };
  console.log("showRecipes", showRecipes);
  return (
    <div className="recipe-cards-wrapper">
      <p>Dashboard</p>
      {!showRecipes ? (
        <p>Loading Recipes</p>
      ) : (
        showRecipes.map((recipe) => <RecipeCard recipe={recipe} />)
      )}
    </div>
  );
};

export default RecipeDashboard;
