import React, { useState } from "react";

const TagEdit = (props) => {
  const { customTags } = props;
  const [updatedTags, setUpdatedTags] = useState({});
  return (
    <div>
      <p>Tag Edit</p>
      {customTags.map((tag, index) => (
        <p>{tag.text}</p>
      ))}
    </div>
  );
};

export default TagEdit;
