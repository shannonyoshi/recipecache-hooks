import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./styling/App.scss";
import Home from "./views/home";
import LogIn from "./views/login";
import SignUp from "./views/signup";
import ShowRecipeView from "./views/showRecipeView";
import RecipeFormView from "./views/recipeFormView";
import TagEditView from "./views/tagEditView";
import PrivateRoute from "./components/privateRoute";

import { fetchTruncRecipes } from "./util/recipeFuncs";
import { fetchUserStatus } from "./util/authFuncs";
import { fetchUserTags } from "./util/tagFuncs";

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
import { faSave, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
library.add(
  faTrashAlt,
  faEdit,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faPlusCircle,
  faCheckCircle,
  faDotCircle,
  faSave,
  faTimesCircle
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
  //state variables
  const [userTags, setUserTags] = useState([allTag]);
  const [selectedTag, setSelectedTag] = useState(allTag);
  const [userStatus, setUserStatus] = useState({
    isLoggedIn: false,
    error: null,
  });
  const [truncRecipes, setTruncRecipes] = useState([]);
  const [fullRecipe, setFullRecipe] = useState(emptyFullRecipe);
  const [addRecipe, setAddRecipe] = useState(emptyFullRecipe);
  //get user status
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
  //get user data
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
        <Redirect exact from="/" to="/home" />
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
        <PrivateRoute
          path="/home"
          component={Home}
          isLoggedIn={userStatus.isLoggedIn}
          truncRecipes={truncRecipes}
          userTags={userTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          setUserStatus={setUserStatus}
        />
        <PrivateRoute
          path="/view/:id"
          component={ShowRecipeView}
          isLoggedIn={userStatus.isLoggedIn}
          fullRecipe={fullRecipe}
          setFullRecipe={setFullRecipe}
          setUserStatus={setUserStatus}
        />
        <PrivateRoute
          path="/edit-tags"
          component={TagEditView}
          isLoggedIn={userStatus.isLoggedIn}
          setUserStatus={setUserStatus}
          userTags={userTags}
        />

        <PrivateRoute
          path="/edit/:id"
          component={RecipeFormView}
          isLoggedIn={userStatus.isLoggedIn}
          setUserStatus={setUserStatus}
          fullRecipe={fullRecipe}
          setFullRecipe={setFullRecipe}
          userTags={userTags}
        />

        <PrivateRoute
          path="/add"
          isLoggedIn={userStatus.isLoggedIn}
          component={RecipeFormView}
          fullRecipe={addRecipe}
          setFullRecipe={setAddRecipe}
          userTags={userTags}
          setUserStatus={setUserStatus}
        />
      </Switch>
    </div>
  );
};

export default App;
