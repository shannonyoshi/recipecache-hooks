import React from "react";
import SignUpForm from "../components/signUpForm";

import "../styling/signUpView.scss";

const SignUp = (props) => {
  const { userStatus, setUserStatus } = props;
  console.log("userStatus Sign Up view", userStatus);
  return (
    <div className="signUp-page-wrapper">
      <SignUpForm userStatus={userStatus} setUserStatus={setUserStatus} />
    </div>
  );
};

export default SignUp;
