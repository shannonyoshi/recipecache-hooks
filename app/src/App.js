import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./styling/App.scss";
import Home from "./views/home";
import LogIn from "./views/login";
import SignUp from "./views/signup";
import ShowRecipe from "./views/showRecipe";
import RecipeFormView from "./views/recipeFormView";

//TODO: set up private routes/ redirects, fix useEffect for fetching to ensure new recipes show up without having to force page refresh

import { fetchTruncRecipes, fetchUserTags } from "./util/recipeFuncs";
import { fetchUserStatus } from "./util/authFuncs";

//FontAwesome Set Up
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faEdit,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faPlusCircle,
  faCheckCircle,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTrashAlt,
  faEdit,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faPlusCircle,
  faCheckCircle,
  faDotCircle
);

const App = () => {
  const allTag = { text: "All", isCustom: 0, id: -1 };
  const emptyFullRecipe = {
    id: null,
    title: "",
    source: "",
    notes: "",
    tags: [],
    ingredients: [],
    instructions: [],
  };

  const [userTags, setUserTags] = useState([allTag]);
  const [selectedTag, setSelectedTag] = useState(allTag);
  const [userStatus, setUserStatus] = useState({
    isLoggedIn: false,
    error: null,
  });
  const [truncRecipes, setTruncRecipes] = useState([]);
  const [fullRecipe, setFullRecipe] = useState(emptyFullRecipe);
  const [addRecipe, setAddRecipe] = useState(emptyFullRecipe);
  useEffect(() => {
    console.log("USE EFFECT APP, fetch status");
    const fetchStatus = async () => {
      try {
        const authStatus = await fetchUserStatus();
        setUserStatus({ isLoggedIn: authStatus, error: null });
        console.log("authStatus", authStatus);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    console.log("USE EFFECT APP fetch recipes");
    if (userStatus.isLoggedIn) {
      const fetchData = async () => {
        try {
          let recipes = await fetchTruncRecipes();
          setTruncRecipes([...recipes]);
        } catch (error) {
          console.log("error", error);
        }
        try {
          let tags = await fetchUserTags();
          setUserTags([allTag, ...tags]);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }
  }, [userStatus]);

  // console.log("userStatus", userStatus);

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
          render={(props) => (
            <LogIn
              {...props}
              userStatus={userStatus}
              setUserStatus={setUserStatus}
            />
          )}
        />
        <Route
          path="/sign-up"
          render={(props) => (
            <SignUp
              {...props}
              userStatus={userStatus}
              setUserStatus={setUserStatus}
            />
          )}
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
              userTags={userTags}
            />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <RecipeFormView
              {...props}
              fullRecipe={addRecipe}
              setFullRecipe={setAddRecipe}
              userTags={userTags}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
