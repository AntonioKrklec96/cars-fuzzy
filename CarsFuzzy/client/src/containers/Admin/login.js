import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions";

function Login(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let { history, user } = props;

  let handleInputEmail = (event) => {
    setEmail(event.target.value);
  };
  let handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (user.login.isAuth) {
      history.push("/");
    }
  }, [props.counter]);

  let submitForm = (e) => {
    e.preventDefault();
    props.dispatch(
      loginUser({
        email: email,
        password: password,
      })
    );
  };

  return (
    <div className="rl_container">
      <form onSubmit={submitForm}>
        <h2>Log in here</h2>

        <div className="form_element">
          <input
            type="email"
            placeholder="Enter your mail"
            required
            value={email}
            onChange={handleInputEmail}
          />
        </div>

        <div className="form_element">
          <input
            type="password"
            placeholder="Enter your password"
            required
            minLength={4}
            value={password}
            onChange={handleInputPassword}
          />
        </div>

        <button type="submit">Log in</button>

        <div className="error">
          {user.login ? <div>{user.login.message}</div> : null}
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
