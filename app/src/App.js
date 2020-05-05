import React from 'react';
import {Route } from "react-router-dom"
import './App.scss';
import Header from "./components/header"
import TagSearch from "./components/tagSearch"
import Home from "./views/home"
import LogIn from "./views/login"
import SignUp from "./views/signup"
import ShowRecipe from "./views/showRecipe"
import RecipeFormView from "./views/recipeFormView"



const App=()=> {
  return (
    <div className="App">
      <Header/>
      <TagSearch/>
      <Route exact path="/" component={Home}/>
      <Route path="/log-in" component={LogIn}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/view/:id" component={ShowRecipe}/>
      <Route path="/edit/:id" component={RecipeFormView}/>
      <Route path="/add" component={RecipeFormView}/>
    </div>
  );
}

export default App;
