import React from "react";

const TagSearch = (props) => {
  const { userTags, selectedTag, setSelectedTag } = props;
  console.log();
  const selectTag = (e, tag) => {
    e.preventDefault();
    setSelectedTag(tag);
  };

  return (
    <div className="search-wrapper">
      <p>Tag Search:</p>
      {userTags.map((tag) => (
        <button
          className={`tag-button ${
            selectedTag.text === tag.text ? "active-tag" : ""
          }`}
          key={`t${tag.id}`}
          onClick={(e) => selectTag(e, tag)}>
          {tag.text}
        </button>
      ))}
    </div>
  );
};

export default TagSearch;
