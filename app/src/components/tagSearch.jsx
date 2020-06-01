import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const TagSearch = (props) => {
  console.log("renderTagSearch");
  const { userTags, selectedTag, setSelectedTag } = props;
  console.log("userTags", userTags);

  const [canEdit, setCanEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [tagEdit, setTagEdit] = useState(null);
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
  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  const deleteTag = (e, tag) => {
    e.preventDefault();
    //TODO: move this functionality to tagEdit component
  };
  console.log("canEdit", canEdit);

  return (
    <div className="search-wrapper">
      <p>Tag Search:</p>
      {userTags.map((tag) => (
        <div>
          {/* {!tagEdit || tagEdit.id !== tag.id ? ( */}
          <button
            className={`tag-button ${
              selectedTag.text === tag.text ? "active-tag" : ""
            }`}
            key={`t${tag.id}`}
            onClick={(e) => selectTag(e, tag)}>
            {tag.text}
          </button>
          {/* ) : (
            <input
              type="text"
              required
              value={tagEdit.text}
              name="text"
              // onChange={(e) => setTagEdit({ ...tagEdit, text: e.target.value })}
            />
          )} */}
          {/* {isEdit && tag.isCustom ? (
            <div>
              <button className="hidden-button" onClick={setTagEdit(tag)}>
                <FontAwesomeIcon icon="edit" />
              </button>
              <button className="hidden-button">
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          ) : null} */}
        </div>
      ))}

      {canEdit ? (
        <Link to={"/edit-tags"}>
          <FontAwesomeIcon
            icon={isEdit ? ["far", "times-circle"] : "edit"}
            className={isEdit ? "close-edit-icon" : "open-edit-icon"}
          />
        </Link>
      ) : null}
    </div>
  );
};

export default TagSearch;
