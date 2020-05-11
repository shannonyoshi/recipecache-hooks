import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const fullRecipe = (props) => {
  const { fullRecipe } = props;
  console.log("fullRecipe", fullRecipe);
  return (
    <div className="recipe-wrapper">
      <p>{fullRecipe.title}</p>
      {fullRecipe.source.length > 0 ? (
        <p>
          <span className="recipe-label">Source:</span>
          {fullRecipe.source}
        </p>
      ) : (
        <></>
      )}

      <div className="ingredient list">
        <p>Ingredients:</p>
        {fullRecipe.ingredients.map((ingredient) => (
          <p key={`ingr ${ingredient.id}`}>{ingredient.text}</p>
        ))}
      </div>
      <div className="instruction list">
        <p>Instructions:</p>
        {fullRecipe.instructions.map((instruction) => (
          <p key={`inst ${instruction.id}`}>
            <span>{instruction.order}. </span>
            {instruction.text}
          </p>
        ))}
      </div>
      {fullRecipe.tags.length > 0 ? (
        <div className="tags list">
          <p>Tags:</p>
          {fullRecipe.tags.map((tag) => (
            <span key={tag.id}>{tag.text}</span>
          ))}
        </div>
      ) : (
        <></>
      )}

      {fullRecipe.notes.length > 0 ? (
        <p>
          <span>Notes: </span>
          {fullRecipe.notes}
        </p>
      ) : (
        <></>
      )}
      <div className="icons">
        <Link to={`/edit/${fullRecipe.id}`}>
          <FontAwesomeIcon icon="edit" />
        </Link>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};

export default fullRecipe;
