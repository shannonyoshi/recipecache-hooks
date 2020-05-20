import React from "react";

const TagSearch = (props) => {
  const { userTags, selectedTag, setSelectedTag } = props;
  const selectTag = (e, tag) => {
    e.preventDefault();
    setSelectedTag(tag);
  };
  //TODO: add ability to delete/edit tags

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
