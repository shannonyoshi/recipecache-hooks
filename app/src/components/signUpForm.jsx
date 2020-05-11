import React, { useState } from "react";
import { Link } from "react-router-dom";

const initInputState = {
  userName: "",
  email: "",
  password1: "",
  password2: "",
};

const SignUpForm = () => {
  const [inputs, setInputs] = useState(initInputState);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    e.persist();
    // console.log("event.target", e.target, "event.target.value",e.target.value)
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.password1 === inputs.password2) {
      setPasswordMatch(true);
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
        <p>User Name</p>
        <input
          type="text"
          required
          name="userName"
          onChange={handleChange}
          value={inputs.userName}
          placeholder="Some Made Up Name"
        />
        <p>Email</p>
        <input
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={inputs.email}
          placeholder="something@probablygmail.com"
        />
        {/* {this.state.showErrors && this.state.validEmail.length > 0 ? (
            <p>{this.state.emailError}</p>
          ) : (
            ""
          )} */}
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
        {!passwordMatch ? (
          <p>Your passwords don't match. Please re-enter</p>
        ) : (
          <></>
        )}
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
        {/* {this.props.signUpError ? <p>Error Signing Up</p> : <></>} */}
      </form>
    </div>
  );
};

export default SignUpForm;

// signUp = async (e) => {
//   e.preventDefault();
//   const isValid = this.validateInputs();
//   console.log("state", this.state, "isValid", isValid);
//   if (isValid) {
//     const newUser = {
//       email: this.state.email,
//       password: this.state.password1,
//     };
//     await this.props.signUp(newUser, this.props.history);
//     this.setState({
//       email: "",
//       password1: "",
//       password2: "",
//       showErrors: false,
//       passwordError: false,
//       emailError: false,
//     });
//   } else {
//     this.setState({ ...this.state, showErrors: true });
//   }
// };

// const mapStateToProps = state => ({
//   loading: state.loading,
//   error: state.signUpError,
//   loggedIn: state.loggedIn
// });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { signUp, checkStatus })
//   (SignUpForm)
// );
