import React from "react";
import LogInForm from "../components/logInForm";

import "../styling/logInView.scss";

const LogIn = () => {
  return (
    <div className="login-page-wrapper">
      <LogInForm />
    </div>
  );
};

export default LogIn;
