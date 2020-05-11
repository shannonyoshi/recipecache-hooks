import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./styling/App.scss";
import Home from "./views/home";
import LogIn from "./views/login";
import SignUp from "./views/signup";
import ShowRecipe from "./views/showRecipe";
import RecipeFormView from "./views/recipeFormView";

import { fetchTruncRecipes, fetchUserTags } from "./util/apiFunctions";

//FontAwesome Set Up
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faEdit,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faEdit, faArrowAltCircleUp, faArrowAltCircleDown);

const App = () => {
  const allTag = { text: "All", isCustom: 0, id: -1 };
  const emptyFullRecipe = {
    id: null,
    title: "",
    source: "",
    notes: "",
    tags: [],
    instructions: [],
    ingredients: [],
  };

  const [userTags, setUserTags] = useState([allTag]);
  const [selectedTag, setSelectedTag] = useState(allTag);
  const [userState, setUserState] = useState({
    userName: "",
    isLoggedIn: false,
    error: null,
  });
  const [truncRecipes, setTruncRecipes] = useState([]);
  const [fullRecipe, setFullRecipe] = useState(emptyFullRecipe);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let recipes = await fetchTruncRecipes();
        setTruncRecipes([...recipes]);
        // console.log("recipes", recipes);
      } catch (error) {
        console.log("error", error);
      }
      try {
        let tags = await fetchUserTags();
        // console.log("tags", tags);
        setUserTags([allTag, ...tags]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/home/:tag?"
          render={(props) => (
            <Home
              {...props}
              truncRecipes={truncRecipes}
              userTags={userTags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          )}
        />
        <Route
          path="/log-in"
          render={(props) => <LogIn {...props} userState={userState} />}
        />
        <Route
          path="/sign-up"
          render={(props) => <SignUp {...props} userState={userState} />}
        />
        <Route
          path="/view/:id"
          render={(props) => (
            <ShowRecipe
              {...props}
              fullRecipe={fullRecipe}
              setFullRecipe={setFullRecipe}
            />
          )}
        />
        <Route
          path="/edit/:id"
          render={(props) => (
            <RecipeFormView
              {...props}
              fullRecipe={fullRecipe}
              setFullRecipe={setFullRecipe}
            />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <RecipeFormView
              {...props}
              fullRecipe={fullRecipe}
              setFullRecipe={setFullRecipe}
              emptyFullRecipe={emptyFullRecipe}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
