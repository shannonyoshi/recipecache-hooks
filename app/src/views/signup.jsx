import React from "react";
import SignUpForm from "../components/signUpForm";

import "../styling/signUpView.scss";

const SignUp = () => {
  return (
    <div className="signUp-page-wrapper">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
