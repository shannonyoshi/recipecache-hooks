import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import { sortInstructions } from "../util/apiFunctions";

const RecipeForm = (props) => {
  const { setFullRecipe, fullRecipe, isEdit } = props;
  // console.log("props", props);
  // console.log("fullRecipe", fullRecipe);
  const handleChange = (e, index = null) => {
    e.persist();
    // console.log("handleChange e.target", e.target);

    if (index === null) {
      setFullRecipe((fullRecipe) => ({
        ...fullRecipe,
        [e.target.name]: e.target.value,
      }));
    } else {
      const names = e.target.name.split(" ");
      let array = fullRecipe[names[0]];
      array[index][names[1]] = e.target.value;
      setFullRecipe((fullRecipe) => ({
        ...fullRecipe,
        [names[0]]: [...array],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: finish this function
  };

  const moveInstruction = (e, change, curPos) => {
    e.persist();
    let instructions = fullRecipe.instructions;
    let updatedInstr = [];
    if (change === "up") {
      updatedInstr = instructions.map((instruction) => {
        if (instruction.order === curPos - 1) {
          instruction.order += 1;
          return instruction;
        } else {
          if (instruction.order === curPos) {
            instruction.order -= 1;
            return instruction;
          } else {
            return instruction;
          }
        }
      });
    }
    if (change === "down") {
      updatedInstr = instructions.map((instruction) => {
        if (instruction.order === curPos + 1) {
          instruction.order -= 1;
          return instruction;
        } else {
          if (instruction.order === curPos) {
            instruction.order += 1;
            return instruction;
          } else {
            return instruction;
          }
        }
      });
    }
    sortInstructions(updatedInstr);
    setFullRecipe({ ...fullRecipe, instructions: [...updatedInstr] });
  };

  return (
    <div className="form-wrapper" onSubmit={handleSubmit}>
      <p>Recipe Form</p>
      <form className="recipe-form">
        <label>Title</label>
        <input
          type="text"
          required
          name="title"
          onChange={handleChange}
          value={fullRecipe.title}
        />
        <label>Source</label>
        <input
          type="text"
          name="source"
          onChange={handleChange}
          value={fullRecipe.source}
        />
        <label>Ingredients</label>
        {fullRecipe.ingredients.length > 0 ? (
          <div className="ingredient list">
            {fullRecipe.ingredients.map((ingredient, index) => (
              <input
                key={`ingredient ${index}`}
                type="text"
                name="ingredients text"
                value={ingredient.text}
                id={ingredient.id}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
        ) : (
          <input type="text" name="ingredient" />
        )}
        <label>Instructions</label>

        {fullRecipe.instructions.length > 0 ? (
          <div className="instruction list">
            {fullRecipe.instructions.map((instruction, index) => (
              <>
                {/* <input
                  key={`inst O ${index}`}
                  type="number"
                  name="instructions order"
                  value={instruction.order}
                  onChange={(e) => handleArrayChange(e, index)}
                /> */}
                <span>{instruction.order}</span>
                <input
                  key={`inst T ${index}`}
                  type="text"
                  name="instructions text"
                  value={instruction.text}
                  onChange={(e) => handleChange(e, index)}
                />
                {index != 0 ? (
                  <button
                    onClick={(e) =>
                      moveInstruction(e, "up", instruction.order)
                    }>
                    <FontAwesomeIcon icon="arrow-alt-circle-up" />
                  </button>
                ) : null}
                {index != fullRecipe.instructions.length - 1 ? (
                  <button
                    onClick={(e) =>
                      moveInstruction(e, "down", instruction.order)
                    }>
                    <FontAwesomeIcon icon="arrow-alt-circle-down" />
                  </button>
                ) : null}
              </>
            ))}
          </div>
        ) : null}

        <label>Tags</label>
        <label>Notes</label>
      </form>
    </div>
  );
};

export default RecipeForm;
