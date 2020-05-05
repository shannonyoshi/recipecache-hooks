import React, { useState } from "react";
import { Link} from "react-router-dom";

const initInputState = { email: "", password: "" };

const LogInForm = () => {
  const [inputs, setInputs] = useState(initInputState);


  const handleChange = (e) => {
    e.persist();
    // console.log("event.target", e.target, "event.target.value",e.target.value)
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: add handleSubmit function
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-wrapper">
        {/* {this.props.loading ? (
          <h2>Loading</h2>
        ) : (
          <> */}
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
          {/* </> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default LogInForm

// const mapStateToProps = state => ({
//   loading: state.loading,
//   success: state.success,
//   error: state.error,
//   loggedIn: state.loggedIn
// });
