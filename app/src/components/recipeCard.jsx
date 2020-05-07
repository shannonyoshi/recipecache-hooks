import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const { recipe } = props;
  console.log("RecipeCard: recipe", recipe);

  return (
    // <div className="recipe-card">
    <Link to={`/view/${recipe.id}`} key={recipe.id} className="recipe-link">
      <div className="recipe-card-info">
        <h3>{recipe.title}</h3>
        <p>Source: {recipe.source}</p>
      </div>
      <div className="recipe-card-tags">
        <span>
          <strong>Tags:</strong>
        </span>
        {recipe.tags.map((tag) => (
          <span className="tag" key={`tag${tag.id}`}>
            {tag.text}
          </span>
        ))}
      </div>
    </Link>
    // </div>
  );
};

export default RecipeCard;
