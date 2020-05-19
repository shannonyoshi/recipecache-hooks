import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { registerUser } from "../util/authFuncs";

const initInputState = {
  email: "",
  password1: "",
  password2: "",
};

const SignUpForm = (props) => {
  const { userStatus, setUserStatus } = props;
  // console.log("userStatus", userStatus);
  const [inputs, setInputs] = useState(initInputState);
  const [passwordMatch, setPasswordMatch] = useState(true);

  let history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password1 === inputs.password2) {
      setPasswordMatch(true);
      const newUser = {
        email: inputs.email,
        password: inputs.password1,
      };
      // registerUser(newUser);
      const response = await registerUser(newUser);
      console.log("response", response);
      if (response === 201) {
        setUserStatus({ isLoggedIn: true, error: null });
        history.push("/home");
      } else {
        setUserStatus({ isLoggedIn: false, error: response });
      }
    } else {
      setPasswordMatch(false);
      setInputs({ ...inputs, password2: "" });
    }
  };

  return (
    <div className="signUp-form-wrapper">
      <form className="signUp-form" onSubmit={handleSubmit}>
        <div className="signUp-form-header">
          <div className="signUp-logo-wrapper">
            {/* TODO: replace logo image  <img src={logo} alt="logo" className="signUp-logo" /> */}
          </div>
          <h3>Welcome to</h3>
          <h2>Recipe Cache</h2>
        </div>
        <p>Email</p>
        <input
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={inputs.email}
          placeholder="something@probablygmail.com"
        />
        <p>Create password</p>
        <input
          type="password"
          required
          name="password1"
          onChange={handleChange}
          value={inputs.password1}
          minLength="8"
          placeholder="Something unforgettable"
        />
        <p>Confirm password</p>
        <input
          type="password"
          required
          name="password2"
          onChange={handleChange}
          value={inputs.password2}
          minLength="8"
          placeholder="Same unforgettable thing"
        />

        <br />
        <button className="signUp-btn" type="submit">
          Sign Up
        </button>
        <p className="signUp-small-font">
          Already a member? Sign in{" "}
          <Link to="/log-in" className="signUp-link">
            here
          </Link>
        </p>
        {!passwordMatch ? (
          <p className="error-message">Your passwords don't match</p>
        ) : null}
        {userStatus.error ? (
          <p className="error-message">{userStatus.error}</p>
        ) : null}
      </form>
    </div>
  );
};

export default SignUpForm;
