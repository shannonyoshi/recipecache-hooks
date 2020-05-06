import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const { recipe } = props;
  console.log("RecipeCard: recipe", recipe);
  // TODO: adjust ID to be actual truncated recipes ID
  const id = 34;
  return (
    <div className="recipe-card">
      <Link to={`/view/${id}`} key={id}>
        <h3>{recipe.title}</h3>
        <p>Source: {recipe.source}</p>
        <div className="recipe-card-tags">
          <span>Tags:</span>
          {recipe.tags.map((tag) => (
            <span className="tag" key={`tag${tag.id}`}>
              {tag.text}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
