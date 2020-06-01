import React, { useState, useEffect } from "react";
import TagEdit from "../components/tagEdit";

const TagEditView = (props) => {
  const { userTags } = props;
  const [customTags, setCustomTags] = useState([]);
  useEffect(() => {
    const tagsToEdit = userTags.filter((tag) => tag.isCustom !== 0);
    if (tagsToEdit.length > 0) {
      setCustomTags([...tagsToEdit]);
    }
  }, [userTags]);
  return (
    <div>
      {customTags.length === 0 ? (
        <p>We didn't find any custom tags to edit</p>
      ) : (
        <TagEdit customTags={customTags} />
      )}
    </div>
  );
};

export default TagEditView;
