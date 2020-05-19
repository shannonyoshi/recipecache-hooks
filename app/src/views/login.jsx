import React from "react";
import LogInForm from "../components/logInForm";

import "../styling/logInView.scss";

const LogIn = (props) => {
  const { userStatus, setUserStatus } = props;
  return (
    <div className="login-page-wrapper">
      <LogInForm userStatus={userStatus} setUserStatus={setUserStatus} />
    </div>
  );
};

export default LogIn;
