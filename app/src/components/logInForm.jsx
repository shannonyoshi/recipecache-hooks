import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../util/authFuncs";

const initInputState = { email: "", password: "" };

const LogInForm = (props) => {
  const { userStatus, setUserStatus } = props;
  const [inputs, setInputs] = useState(initInputState);
  const [error, setError] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (userStatus.isLoggedIn) {
      history.push("/home");
    }
  }, [userStatus]);

  const handleChange = (e) => {
    e.persist();
    // console.log("event.target", e.target, "event.target.value",e.target.value)
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await loginUser(inputs);
    console.log("log in response", response);
    if (response === 200) {
      setInputs(initInputState);
      setUserStatus({ isLoggedIn: true, error: null });
    } else {
      setError(response);
    }
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-header">
          <div className="login-logo-wrapper">
            {/* TODO: replace logo image <img src={logo} alt="logo" className="login-logo" /> */}
          </div>
          <h3>Log in to</h3>
          <h2>Recipe Cache</h2>
        </div>
        <p>Email</p>
        <input
          type="text"
          required
          name="email"
          onChange={handleChange}
          value={inputs.email}
        />
        <p>Password</p>
        <input
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        <button className="login-btn" type="submit">
          Log In
        </button>
        <p className="login-small-font">
          Not a member? Sign up{" "}
          <Link className="login-link" to="/sign-up">
            here
          </Link>
        </p>
      </form>
      {error ? <p className="error-message">{error}</p> : null}
    </div>
  );
};

export default LogInForm;
