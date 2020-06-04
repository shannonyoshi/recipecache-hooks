import React from "react";
import { Route, Redirect } from "react-router-dom";

// TODO: add check for loggedIn status

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log("Private Route: isLoggedIn", isLoggedIn);
  console.log("props", rest);

  // console.log("rest", rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/log-in" />
        )
      }
    />
  );
};

export default PrivateRoute;
