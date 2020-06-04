import React, { useState, useEffect } from "react";
import RecipeCard from "./recipeCard";

const RecipeDashboard = (props) => {
  const { selectedTag, truncRecipes } = props;
  // console.log("Dashboard: selectedTag", selectedTag);
  // console.log("Dashboard truncRecipes", truncRecipes);
  const [showRecipes, setShowRecipes] = useState([...truncRecipes]);
  useEffect(() => {
    filterRecipes();
  }, [selectedTag, truncRecipes]);

  const filterRecipes = () => {
    if (selectedTag.text === "All") {
      setShowRecipes([...truncRecipes]);
    } else {
      let filteredRecipes = [];
      for (let i = 0; i < truncRecipes.length; i++) {
        if (truncRecipes[i].tags.length > 0) {
          //   console.log("truncRecipes[i].tags", truncRecipes[i].tags);
          let tagsMatch = truncRecipes[i].tags.some(
            (tag) => tag.id === selectedTag.id
          );
          if (tagsMatch) {
            filteredRecipes.push(truncRecipes[i]);
          }
        }
      }
      // console.log("filteredRecipes", filteredRecipes);
      setShowRecipes(filteredRecipes);
    }
  };
  // console.log("showRecipes", showRecipes);
  return (
    <div className="recipe-cards-wrapper">
      {!showRecipes ? (
        <p>Loading Recipes</p>
      ) : (
        showRecipes.map((recipe) => <RecipeCard recipe={recipe} />)
      )}
    </div>
  );
};

export default RecipeDashboard;
