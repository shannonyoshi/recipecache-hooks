import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortInstructions, postPutRecipe } from "../util/recipeFuncs";

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //assumes that if text is entered in the custom tag input, user wants to add the tag
    const fullTags = fullRecipe.tags;
    //recipeSubmit should be cleaned and ready to submit after removing empty items
    let recipeSubmit = {
      id: fullRecipe.id,
      title: fullRecipe.title,
      source: fullRecipe.source,
      notes: fullRecipe.notes,
    };
    if (customTag.length > 0) {
      createCustomTag();
      fullTags.push({ text: customTag, isCustom: true, id: null });
    }
    if (fullTags.length > 0) {
      recipeSubmit["tags"] = fullTags;
    }
    const filteredIngredients = fullRecipe.ingredients.filter(
      (ingredient) => ingredient.text.length > 0
    );
    if (filteredIngredients.length > 0) {
      recipeSubmit["ingredients"] = filteredIngredients;
    }
    const filteredInstructions = fullRecipe.instructions.filter(
      (instruction) => instruction.text.length > 0
    );
    if (filteredInstructions.length > 0) {
      recipeSubmit["instructions"] = filteredInstructions;
    }
    postPutRecipe(recipeSubmit);
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
    setFullRecipe({
      ...fullRecipe,
      instructions: [...fullRecipe.instructions, emptyInstruction],
    });
  };
  const tagToggle = (tag) => {
    let currentTags = fullRecipe.tags;
    const indexToRemove = currentTags.findIndex(
      (thisTag) => thisTag.text === tag.text
    );
    if (indexToRemove !== -1) {
      currentTags.splice(indexToRemove, 1);
    } else {
      currentTags.push(tag);
    }
    setFullRecipe({ ...fullRecipe, tags: currentTags });
  };

  const createCustomTag = () => {
    if (customTag.length > 0) {
      const newTag = { text: customTag, isCustom: true, id: null };
      setFullRecipe({ ...fullRecipe, tags: [...fullRecipe.tags, newTag] });
      setAllTags([...allTags, newTag]);
      setCustomTag("");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="recipe-form" onSubmit={handleSubmit} autoComplete="off">
        <section className="title-section">
          <label>Title</label>
          <input
            type="text"
            required
            name="title"
            onChange={(e) =>
              setFullRecipe({ ...fullRecipe, title: e.target.value })
            }
            value={fullRecipe.title}
            placeholder="Best Pancakes Ever"
          />
        </section>
        <section className="source-section">
          <label>Source</label>
          <input
            type="text"
            name="source"
            onChange={(e) =>
              setFullRecipe({ ...fullRecipe, source: e.target.value })
            }
            value={fullRecipe.source}
            placeholder="Gourmet Magazine"
          />
        </section>
        <section className="ingredients">
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
          ) : null}
          <button
            onClick={addIngredient}
            type="button"
            className="icon-button ">
            <FontAwesomeIcon icon="plus-circle" className="icon large" />
          </button>
        </section>
        <section className="instructions-section">
          <label>Instructions</label>

          {fullRecipe.instructions.length > 0 ? (
            <div className="instruction-list">
              {fullRecipe.instructions.map((instruction, index) => (
                <div className="instruction" key={`inst T ${index}`}>
                  <span>{instruction.order}. </span>
                  <textarea
                    type="text"
                    name="instructions text"
                    value={instruction.text}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Do something"
                    className="instruction-input"
                  />
                  {index !== 0 ? (
                    <button
                      onClick={(e) =>
                        moveInstruction(e, "up", instruction.order)
                      }
                      type="button"
                      className="icon-button">
                      <FontAwesomeIcon
                        icon="arrow-alt-circle-up"
                        className="icon"
                      />
                    </button>
                  ) : null}
                  {index !== fullRecipe.instructions.length - 1 ? (
                    <button
                      onClick={(e) =>
                        moveInstruction(e, "down", instruction.order)
                      }
                      type="button"
                      className="icon-button">
                      <FontAwesomeIcon
                        icon="arrow-alt-circle-down"
                        className="icon"
                      />
                    </button>
                  ) : null}
                </div>
              ))}
              <button
                onClick={addInstruction}
                type="button"
                className="icon-button">
                <FontAwesomeIcon icon="plus-circle" className="icon large" />
              </button>
            </div>
          ) : null}
        </section>
        <section className="tag-section">
          <label>Tags</label>
          <div className="tags">
            {allTags.map((tag, index) => (
              <button
                type="button"
                className={`tag-button ${
                  fullRecipe.tags.some((thisTag) => thisTag.text === tag.text)
                    ? "active"
                    : ""
                }`}
                onClick={() => tagToggle(tag)}
                key={`tag-button ${tag.id ? tag.id : `c${index}`}`}>
                {tag.text}
              </button>
            ))}

            <div className="custom-tag">
              <input
                type="text"
                name="custom"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="custom tag"
                className="tag-input"
              />
              <button
                type="button"
                onClick={createCustomTag}
                className="icon-button">
                <FontAwesomeIcon icon="check-circle" className="icon medium" />
              </button>
            </div>
          </div>
        </section>
        <section className="note-section">
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
        </section>
        <button type="submit" className="submit-button">
          {page === "/add" ? "Create" : "Save"} Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
