import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TagEdit = (props) => {
  const { customTags } = props;
  const [updatedTags, setUpdatedTags] = useState({});

  return (
    <div>
      <p>Tag Edit</p>
      {customTags.map((tag, index) => (
        <InlineEdit tag={tag} />
      ))}
    </div>
  );
};

const InlineEdit = (props) => {
  const { tag } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [inputVal, setInputVal] = useState(tag.text);
  // console.log("tag, isEdit, inputVal", tag, isEdit, inputVal);
  const updateTag = (e) => {
    console.log("updateTag");
    // TODO: write this function
  };

  const removeTag = (e) => {
    console.log("removeTag");
    // TODO: write this function
  };
  return (
    <>
      <p className="warning-note">
        Please note: Editing tags here affects all recipes which contain this
        tag. Deleting a tag will remove it from all recipes. You can only edit
        custom tags.
      </p>
      {isEdit ? (
        <div>
          <input
            type="text"
            required
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button onClick={updateTag} className="hidden-button">
            <FontAwesomeIcon icon={["far", "save"]} />
          </button>
          <button onClick={() => setIsEdit(false)}>
            <FontAwesomeIcon icon={["far", "times-circle"]} />
          </button>
        </div>
      ) : (
        <div>
          <p>{tag.text}</p>
          <button onClick={() => setIsEdit(true)}>
            <FontAwesomeIcon icon="edit" />
          </button>
          <button onClick={removeTag}>
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      )}
    </>
  );
};

export default TagEdit;
