import React from "react";
import Header from "../components/header";
import TagSearch from "../components/tagSearch";
import RecipeDashboard from "../components/recipeDashboard";

import "../styling/homeView.scss";

const Home = (props) => {
  const {
    truncRecipes,
    userTags,
    selectedTag,
    setSelectedTag,
    setUserStatus,
  } = props;

  // console.log("props", props);
  return (
    <div>
      <Header setUserStatus={setUserStatus} />
      <TagSearch
        userTags={userTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <h1>Your Recipes</h1>
      <RecipeDashboard truncRecipes={truncRecipes} selectedTag={selectedTag} />
    </div>
  );
};

export default Home;
