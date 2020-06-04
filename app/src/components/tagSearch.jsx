import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const TagSearch = (props) => {
  const { userTags, selectedTag, setSelectedTag } = props;
  // console.log("userTags", userTags);

  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    const customTags = userTags.filter((tag) => tag.isCustom !== 0);
    if (customTags.length > 0) {
      setCanEdit(true);
    }
  }, [userTags]);

  // const selectTag = (e, tag) => {
  //   e.preventDefault();
  //   setSelectedTag(tag);
  // };

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
            onClick={() => setSelectedTag(tag)}>
            {tag.text}
          </button>
        </div>
      ))}

      {canEdit ? (
        <Link to={"/edit-tags"} className="hidden-link">
          <FontAwesomeIcon icon="edit" className="icon-button" />
        </Link>
      ) : null}
    </div>
  );
};

export default TagSearch;
