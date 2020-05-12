import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortInstructions } from "../util/apiFunctions";

const RecipeForm = (props) => {
  const { setFullRecipe, fullRecipe, allTags, setAllTags, page } = props;

  const [customTag, setCustomTag] = useState("");
  const handleChange = (e, index = null) => {
    e.persist();
    const names = e.target.name.split(" ");
    let array = fullRecipe[names[0]];
    array[index][names[1]] = e.target.value;
    setFullRecipe((fullRecipe) => ({
      ...fullRecipe,
      [names[0]]: [...array],
    }));
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: finish this function
  };

  const moveInstruction = (e, change, curPos) => {
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
  const addIngredient = () => {
    const emptyIngredient = { text: "" };
    setFullRecipe({
      ...fullRecipe,
      ingredients: [...fullRecipe.ingredients, emptyIngredient],
    });
  };

  const addInstruction = () => {
    const emptyInstruction = {
      text: "",
      order: fullRecipe.instructions.length + 1,
    };
    console.log("emptyInstruction", emptyInstruction);
    setFullRecipe({
      ...fullRecipe,
      instructions: [...fullRecipe.instructions, emptyInstruction],
    });
  };
  const tagToggle = (tag) => {
    console.log("tagToggle");
    let currentTags = fullRecipe.tags;
    const indexToRemove = currentTags.findIndex(
      (thisTag) => thisTag.text == tag.text
    );
    console.log("indexToRemove", indexToRemove);
    if (indexToRemove != -1) {
      currentTags.splice(indexToRemove, 1);
    } else {
      currentTags.push(tag);
    }
    setFullRecipe({ ...fullRecipe, tags: currentTags });
  };

  const createCustomTag = () => {
    if (customTag.length > 0) {
      const newTag = { text: customTag };
      setFullRecipe({ ...fullRecipe, tags: [fullRecipe.tags, newTag] });
      setAllTags([...allTags, newTag]);
      setCustomTag("");
    }
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
          onChange={(e) =>
            setFullRecipe({ ...fullRecipe, title: e.target.value })
          }
          value={fullRecipe.title}
        />
        <label>Source</label>
        <input
          type="text"
          name="source"
          onChange={(e) =>
            setFullRecipe({ ...fullRecipe, source: e.target.value })
          }
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
                placeholder="3 cups flour"
              />
            ))}
          </div>
        ) : (
          <input type="text" name="ingredient" />
        )}
        <button onClick={addIngredient} type="button">
          <FontAwesomeIcon icon="plus-circle" />
        </button>
        <label>Instructions</label>

        {fullRecipe.instructions.length > 0 ? (
          <div className="instruction list">
            {fullRecipe.instructions.map((instruction, index) => (
              <div className="instruction">
                <span>{instruction.order}</span>
                <input
                  key={`inst T ${index}`}
                  type="text"
                  name="instructions text"
                  value={instruction.text}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Do something"
                />
                {index != 0 ? (
                  <button
                    onClick={(e) => moveInstruction(e, "up", instruction.order)}
                    type="button">
                    <FontAwesomeIcon icon="arrow-alt-circle-up" />
                  </button>
                ) : null}
                {index != fullRecipe.instructions.length - 1 ? (
                  <button
                    onClick={(e) =>
                      moveInstruction(e, "down", instruction.order)
                    }
                    type="button">
                    <FontAwesomeIcon icon="arrow-alt-circle-down" />
                  </button>
                ) : null}
              </div>
            ))}
            <button onClick={addInstruction} type="button">
              <FontAwesomeIcon icon="plus-circle" />
            </button>
          </div>
        ) : null}

        <label>Tags</label>
        {allTags.map((tag) => (
          <button
            type="button"
            className={`tag-button ${
              fullRecipe.tags.some((thisTag) => thisTag.text == tag.text)
                ? "active"
                : ""
            }`}
            onClick={() => tagToggle(tag)}>
            {tag.text}
          </button>
        ))}
        <input
          type="text"
          name="custom"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          placeholder="custom tag"
        />
        <button type="button" onClick={createCustomTag}>
          <FontAwesomeIcon icon="check-circle" />
        </button>
        <label>Note</label>
        <textarea
          type="text"
          name="notes"
          value={fullRecipe.notes}
          placeholder="note"
          onChange={(e) =>
            setFullRecipe({ ...fullRecipe, notes: e.target.value })
          }
        />
        <button type="submit">
          {page == "/add" ? "Create" : "Save"} Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
