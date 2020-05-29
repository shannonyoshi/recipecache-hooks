import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const fullRecipe = (props) => {
  const { fullRecipe } = props;
  console.log("fullRecipe", fullRecipe);
  // console.log("fullRecipe.instructions length", fullRecipe.instructions.length);
  return (
    <div className="recipe-wrapper">
      <h1 className="recipe-title">{fullRecipe.title}</h1>
      {fullRecipe.source.length > 0 ? (
        <div className="recipe-source">
          <h4 className="source-label">Source:</h4>
          <p>{fullRecipe.source}</p>
        </div>
      ) : null}

      <div className="ingredient-list">
        <h4 className="ingredients-label">Ingredients:</h4>
        {fullRecipe.ingredients.map((ingredient) => (
          <p key={`ingr ${ingredient.id}`} className="ingredient">
            <FontAwesomeIcon icon="dot-circle" className="dot" />
            {ingredient.text}
          </p>
        ))}
      </div>
      <div className="instruction-list">
        <h4 className="instructions-label">Instructions:</h4>
        {fullRecipe.instructions.map((instruction) => (
          <p className="instruction" key={`inst ${instruction.id}`}>
            <span className="order-num">{instruction.order}. </span>
            {instruction.text}
          </p>
        ))}
      </div>
      {fullRecipe.tags.length > 0 ? (
        <div className="tags-list">
          <h4 className="tags-label">Tags:</h4>
          <div className="tags">
            {fullRecipe.tags.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {fullRecipe.notes.length > 0 ? (
        <div>
          <h4 className="notes-label">Notes: </h4>
          <p>{fullRecipe.notes}</p>
        </div>
      ) : null}
      <div className="icons">
        <Link to={`/edit/${fullRecipe.id}`}>
          <FontAwesomeIcon icon="edit" className="icon-edit" />
        </Link>
        <button className="delete-button">
          <FontAwesomeIcon icon="trash-alt" className="icon-trash" />
        </button>
      </div>
    </div>
  );
};

export default fullRecipe;
