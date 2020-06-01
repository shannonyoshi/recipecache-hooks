import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TagSearch = (props) => {
  const { userTags, selectedTag, setSelectedTag } = props;
  console.log("userTags", userTags);

  const [canEdit, setCanEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const customTags = userTags.filter((tag) => tag.isCustom !== 0);
    if (customTags.length > 0) {
      setCanEdit(true);
    }
  }, [userTags]);

  const selectTag = (e, tag) => {
    e.preventDefault();
    setSelectedTag(tag);
  };
  //TODO: add ability to delete/edit tags
  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };
  console.log("canEdit", canEdit);

  return (
    <div className="search-wrapper">
      <p>Tag Search:</p>
      {userTags.map((tag) => (
        <div>
          <button
            className={`tag-button ${
              selectedTag.text === tag.text ? "active-tag" : ""
            }`}
            key={`t${tag.id}`}
            onClick={(e) => selectTag(e, tag)}>
            {tag.text}
          </button>
          {isEdit && tag.isCustom ? (
            <div>
              <button className="hidden-button">
                <FontAwesomeIcon icon="edit" />
              </button>
              <button className="hidden-button">
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          ) : null}
        </div>
      ))}
      {canEdit ? (
        <button className="hidden-button" onClick={toggleEdit}>
          <FontAwesomeIcon
            icon={isEdit ? ["far", "times-circle"] : "edit"}
            className={isEdit ? "close-edit-icon" : "open-edit-icon"}
          />
        </button>
      ) : (
        <p>Can't Edit</p>
      )}
      {isEdit ? (
        <p className="edit-warning">
          Editing a tag here will change it in all recipes, deleting a tag here
          will remove the tag from all recipes
        </p>
      ) : null}
    </div>
  );
};

export default TagSearch;
